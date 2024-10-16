import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

async function getUserDetails(username: string) {
  console.log(`Fetching user details for ${username}`);
  const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,description,profile_image_url`, {
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  });

  if (!response.ok) {
    console.error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
    throw new Error('Failed to fetch user details');
  }

  const userData = await response.json();
  console.log('User details:', userData);
  return userData.data;
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

    const roast = completion.content[0].type === 'text' 
      ? completion.content[0].text 
      : 'Unable to generate roast';

    return NextResponse.json({
      username,
      roast,
      name: userDetails.name,
      profile_image_url: userDetails.profile_image_url,
    });
  } catch (error: any) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}