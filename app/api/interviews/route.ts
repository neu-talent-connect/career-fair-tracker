import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/interviews - Get all interviews for authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const interviews = await prisma.interview.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error('GET /api/interviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/interviews - Create a new interview
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...interviewData } = body;

    const interview = await prisma.interview.create({
      data: {
        ...interviewData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error('POST /api/interviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
