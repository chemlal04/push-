// routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../../Repo/staffLogic';
import { getKey } from '../../../../Repo/staffLogic';

export async function GET() {
  try {
    const users = await getUser();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function getKeyRoute() {
  try {
    const keys = await getKey();
    return NextResponse.json(keys);
  } catch (error) {
    return NextResponse.error();
  }
}