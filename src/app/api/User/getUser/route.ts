// routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../../Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const users = await getUser();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error();
  }
}
