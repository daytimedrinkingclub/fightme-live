import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { ref, get, set } from 'firebase/database';

export async function GET(
  req: NextRequest,
  { params }: { params: { handle: string } }
) {
  const handle = params.handle;

  try {
    const roastRef = ref(db, `roasts/${handle}`);
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

export async function POST(
  req: NextRequest,
  { params }: { params: { handle: string } }
) {
  const handle = params.handle;
  const roastData = await req.json();

  try {
    const roastRef = ref(db, `roasts/${handle}`);
    await set(roastRef, roastData);
    return NextResponse.json({ message: 'Roast saved successfully' });
  } catch (error) {
    console.error('Error saving roast:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}