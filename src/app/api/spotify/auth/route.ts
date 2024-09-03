import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/api/spotify/callback';

export async function GET() {
  const scope = 'user-read-private user-read-email user-follow-read user-top-read user-read-recently-played';
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', CLIENT_ID!);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);

  return NextResponse.json({ url: authUrl.toString() });
}