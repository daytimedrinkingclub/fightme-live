import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { db } from '../../../lib/firebase';
import { ref, set } from 'firebase/database';

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface GitHubProfile {
  name: string;
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  open_issues_count: number;
  license: any;
  fork: boolean;
}

async function getUserDetails(username: string) {
  let profileResponse: GitHubProfile | null = null;
  let readmeContent: string = '';
  let repoResponse: GitHubRepo[] = [];

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    profileResponse = await response.json();

    if (!response.ok || !profileResponse) {
      throw new Error('Profile not found');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Could not fetch profile');
  }

  console.log('Profile Data:', profileResponse);

  try {
    const readmeResponse = await fetch(`https://raw.githubusercontent.com/${username}/${username}/master/README.md`);
    if (readmeResponse.ok) {
      readmeContent = await readmeResponse.text();
    } else {
      readmeContent = 'No README found';
    }
  } catch (error) {
    console.error('Error fetching README:', error);
    readmeContent = 'Could not fetch README';
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    repoResponse = await response.json();

    if (!response.ok || !repoResponse) {
      throw new Error('Repositories not found');
    }
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Could not fetch repositories');
  }

  console.log('Repository Data:', repoResponse);

  return {
    name: profileResponse.name,
    avatar_url: profileResponse.avatar_url,
    bio: profileResponse.bio,
    company: profileResponse.company,
    location: profileResponse.location,
    followers: profileResponse.followers,
    following: profileResponse.following,
    public_repos: profileResponse.public_repos,
    profile_readme: readmeContent,
    last_15_repositories: repoResponse
      .slice(0, 15)
      .map((repo: GitHubRepo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        open_issues_count: repo.open_issues_count,
        license: repo.license,
        fork: repo.fork,
      })),
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username1 = searchParams.get('username1');
  const username2 = searchParams.get('username2');

  if (!username1 || !username2) {
    return NextResponse.json({ error: 'Both usernames are required' }, { status: 400 });
  }

  let userDetails1, userDetails2;
  try {
    userDetails1 = await getUserDetails(username1);
    userDetails2 = await getUserDetails(username2);
  } catch (error: any) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: `Failed to fetch user details: ${error.message}` }, { status: 404 });
  }

  const prompt = `Compare the following GitHub profiles and declare a winner and loser in a short 100 words with a harsh and sarcastic tone:

**${username1}**: ${JSON.stringify(userDetails1)}
**${username2}**: ${JSON.stringify(userDetails2)}

Who's the top coder? Be blunt and declare the winner and loser with harsh reasons. Also, provide a numerical score for each user out of 100.`;

  let battleResult: string = '';
  let winner: string = '';
  let loser: string = '';
  let winnerScore: number = 0;
  let loserScore: number = 0;

  try {
    const completion = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const contentArray = completion.content as { type: string; text: string }[];
    const fullResponse = contentArray[0].text || 'Could not generate comparison.';

    // Parse the AI response to extract winner, loser, and scores
    const winnerRegex = /Winner.*?: (\w+).*?(\d+)\/100/;
    const loserRegex = /Loser.*?: (\w+).*?(\d+)\/100/;

    const winnerMatch = fullResponse.match(winnerRegex);
    const loserMatch = fullResponse.match(loserRegex);

    if (winnerMatch && loserMatch) {
      winner = winnerMatch[1];
      winnerScore = parseInt(winnerMatch[2]);
      loser = loserMatch[1];
      loserScore = parseInt(loserMatch[2]);
      battleResult = fullResponse.split('\n').slice(2).join('\n').trim(); // Remove winner/loser lines
    } else {
      battleResult = fullResponse;
      // If regex fails, try to extract information from the battleResult
      if (battleResult.includes('Winner') && battleResult.includes('Loser')) {
        const lines = battleResult.split('\n');
        const winnerLine = lines.find(line => line.startsWith('Winner'));
        const loserLine = lines.find(line => line.startsWith('Loser'));
        
        if (winnerLine) {
          const winnerParts = winnerLine.split(':')[1].trim().split('-');
          winner = winnerParts[0].trim();
          winnerScore = parseInt(winnerParts[1].trim().split('/')[0]);
        }
        
        if (loserLine) {
          const loserParts = loserLine.split(':')[1].trim().split('-');
          loser = loserParts[0].trim();
          loserScore = parseInt(loserParts[1].trim().split('/')[0]);
        }
        
        battleResult = lines.slice(2).join('\n').trim();
      }
    }
  } catch (error: any) {
    console.error('Error generating comparison:', error);
    return NextResponse.json({ error: `Failed to generate comparison: ${error.message}` }, { status: 500 });
  }

  console.log('Generated Battle Result:', battleResult);

  const battleData = {
    username1,
    username2,
    battleResult,
    name1: userDetails1.name,
    avatar_url1: userDetails1.avatar_url,
    name2: userDetails2.name,
    avatar_url2: userDetails2.avatar_url,
    winner,
    loser,
    winnerScore,
    loserScore,
    type: '1v1',
    timestamp: Date.now()
  };
  console.log('Battle Data:', battleData);

  const roastRef = ref(db, `roasts/${username1}_vs_${username2}`);
  await set(roastRef, battleData);

  return NextResponse.json(battleData);
}
