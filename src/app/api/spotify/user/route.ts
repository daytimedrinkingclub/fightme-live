import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  const userResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!userResponse.ok) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: userResponse.status });
  }

  const userData = await userResponse.json();
  return NextResponse.json(userData);
}