import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function GET(
  req: NextRequest,
  { params }: { params: { usernames: string } }
) {
  const usernames = params.usernames;
  console.log(`Fetching comparison for usernames: ${usernames}`);

  try {
    const h2hRef = ref(db, `roasts/${usernames}`);
    const snapshot = await get(h2hRef);

    if (snapshot.exists()) {
      const comparisonData = snapshot.val();
      console.log('Comparison data found:', comparisonData);
      return NextResponse.json(comparisonData);
    } else {
      console.log('Comparison not found');
      return NextResponse.json({ error: 'Comparison not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching comparison:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}