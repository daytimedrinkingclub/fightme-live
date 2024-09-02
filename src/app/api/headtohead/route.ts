import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

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
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  const prompt = `Compare the following GitHub profiles and declare the winner in a short and harsh manner:

**${username1}**: ${JSON.stringify(userDetails1)}
**${username2}**: ${JSON.stringify(userDetails2)}

Who’s the top coder? Be blunt and declare the winner with a harsh reason.`;

  let battleResult: string = '';
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

    battleResult = contentArray[0].text || 'Could not generate comparison.';
  } catch (error) {
    console.error('Error generating comparison:', error);
    return NextResponse.json({ error: 'Could not generate comparison' }, { status: 500 });
  }

  console.log('Generated Battle Result:', battleResult);

  return NextResponse.json({
    username1,
    username2,
    battleResult,
    name1: userDetails1.name,
    avatar_url1: userDetails1.avatar_url,
    name2: userDetails2.name,
    avatar_url2: userDetails2.avatar_url,
  });
}
