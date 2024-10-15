import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { ref, get, set } from 'firebase/database';
import { db } from '@/lib/firebase';

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
  const username = searchParams.get('username');
  

  if (!username ) {
    return NextResponse.json({ error: 'Username and API key are required' }, { status: 400 });
  }



  let userDetails;
  try {
    userDetails = await getUserDetails(username);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  const prompt = `Give a short and harsh roasting in 100 words for the following GitHub profile: ${username}. Here are the details: "${JSON.stringify(userDetails)}"`;

  let roast: string = '';
  try {
    const completion = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const contentArray = completion.content as { type: string; text: string }[];

    roast = contentArray[0].text || 'Could not generate roast.';
  } catch (error) {
    console.error('Error generating roast:', error);
    return NextResponse.json({ error: 'Could not generate roast' }, { status: 500 });
  }

  console.log('Generated Roast:', roast);

  const roastRef = ref(db, `roasts/${username}`);
  const roastData = {
    username,
    roast,
    name: userDetails.name,
    avatar_url: userDetails.avatar_url,
    type: 'single',
    timestamp: Date.now()
  };
  await set(roastRef, roastData);

  return NextResponse.json(roastData);
}
