// app/api/Bus/deleteBus/route.ts

import { NextResponse } from 'next/server';
import { deleteBus } from '../../../../Repo/staffLogic';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405, headers: { Allow: 'POST' } });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Bus ID is required' }, { status: 400 });
  }

  try {
    const result = await deleteBus(id);
    if (result) {
      return NextResponse.json({ message: 'Bus deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to delete bus' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting bus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
