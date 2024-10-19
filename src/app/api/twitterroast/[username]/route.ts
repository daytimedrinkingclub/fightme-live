import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  try {
    const roastRef = ref(db, `roasts/${username}`);
    const snapshot = await get(roastRef);

    if (snapshot.exists()) {
      const roastData = snapshot.val();
      return NextResponse.json(roastData);
    } else {
      return NextResponse.json({ error: 'Roast not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching roast:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}