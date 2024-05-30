// app/api/Issue/updateIssueStatus/route.ts


import { NextRequest, NextResponse } from 'next/server';
import { updateIssueStatusById } from '@/Repo/staffLogic';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { issueId, newStatus } = await req.json();

    if (!issueId || !newStatus) {
      return NextResponse.json({ error: 'Issue ID and new status are required' });
    }

    const updatedIssue = await updateIssueStatusById(issueId, newStatus);

    if (!updatedIssue) {
      return NextResponse.json({ error: 'Issue not found' });
    }

    return NextResponse.json({ message: 'Issue status updated successfully', updatedIssue });
  } catch (error) {
    console.error('Error updating issue status:', error);
    return NextResponse.json({ error: 'Failed to update issue status' }, { status: 500 });
  }
}






