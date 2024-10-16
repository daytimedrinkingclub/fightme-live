import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { db } from '../../../lib/firebase';
import { ref, set } from 'firebase/database';

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

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  console.log(`Processing roast request for username: ${username}`);

  try {
    const userDetails = await getUserDetails(username);
    console.log('User details:', userDetails);

    const prompt = `
Roast this Twitter user based on their profile, assuming they are in "Founder Mode." Be harsh but funny in about 100 words.

Username: ${username}
Bio: ${userDetails.description}
Followers: ${userDetails.public_metrics.followers_count}
Following: ${userDetails.public_metrics.following_count}
Tweet count: ${userDetails.public_metrics.tweet_count}

In "Founder Mode," leaders are highly involved, make quick decisions, and prioritize preserving the company's vision and culture. Consider these points:

- Active Involvement: Are they micromanaging their online presence?
- Fast Decision-Making: Do their stats suggest impulsive behavior?
- Preserving Vision and Culture: Is their bio aligned with their follower count and tweet frequency?
- Direct Communication: Does their follower-to-following ratio suggest genuine engagement?
- Challenging Conventional Wisdom: Are they a trendsetter or just another wannabe influencer?

Use these aspects to create a humorous roast that pokes fun at their 'Founder Mode' style.`;

    const completion = await anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const roast = completion.content[0].text;

    const roastData = {
      username,
      roast,
      name: userDetails.name,
      profile_image_url: userDetails.profile_image_url,
    };

    // Save to Firebase
    const roastRef = ref(db, `roasts/${username}`);
    await set(roastRef, {
      ...roastData,
      type: 'twitter',
      timestamp: Date.now()
    });

    return NextResponse.json(roastData);
  } catch (error: any) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
