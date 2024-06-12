// app/api/Travel/getTravel/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getTravel } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
  
    // Fetch travel data
    const travels = await getTravel();

    return NextResponse.json({ travels });
  } catch (error) {
    console.error('Error fetching travels:', error);
    return NextResponse.error();
  }
}
