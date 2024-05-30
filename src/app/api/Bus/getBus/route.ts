// app/api/Bus/getBus/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getBus } from '../../../../Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '4');
    const offset = parseInt(searchParams.get('offset') || '0');
    const buses = await getBus(limit, offset);
    return NextResponse.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    return NextResponse.error();
  }
}
