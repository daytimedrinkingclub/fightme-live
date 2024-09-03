import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('spotify_access_token')?.value;
  
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    console.error('No access token found in cookies');
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  try {
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const followedArtistsResponse = await fetch('https://api.spotify.com/v1/me/following?type=artist&limit=5', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('Followed Artists Response:', followedArtistsResponse.json());

    console.log('Spotify API Response Status:', userResponse.status);

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('Spotify API Error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch user data', details: errorText }, { status: userResponse.status });
    }

    const userData = await userResponse.json();
    console.log('User Data:', userData);
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}