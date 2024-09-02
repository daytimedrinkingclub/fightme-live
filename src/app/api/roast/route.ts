import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from "@anthropic-ai/sdk";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const readmeUrl = `https://raw.githubusercontent.com/${username}/${username}/master/README.md`;
  let readmeContent;
  try {
    const readmeResponse = await fetch(readmeUrl);
    if (!readmeResponse.ok) {
      throw new Error('README not found');
    }
    readmeContent = await readmeResponse.text();
  } catch (error) {
    console.error('Error fetching README:', error);
    return NextResponse.json({ error: 'Could not fetch README' }, { status: 404 });
  }

  console.log('README Content:', readmeContent);

  const prompt = `Give a short and harsh roasting for the following GitHub profile: ${username}. Be sure to include specific roasts based on their README content: "${readmeContent}". `;

  let roast;
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: false,
      messages: [
        {
          role: 'system',
          content:
            'You roast people’s GitHub profiles based on their bio, name, README, and repos as harshly and as spicy as possible, and keep it short.',
        },
        { role: 'user', content: prompt },
      ],
    });

    roast = completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating roast:', error);
    return NextResponse.json({ error: 'Could not generate roast' }, { status: 500 });
  }

  console.log('Generated Roast:', roast);

  return NextResponse.json({ username, roast });
}