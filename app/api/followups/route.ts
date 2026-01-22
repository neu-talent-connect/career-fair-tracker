import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/followups - Get all follow-ups for authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const followups = await prisma.followUp.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(followups);
  } catch (error) {
    console.error('GET /api/followups error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/followups - Create a new follow-up
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...followupData } = body;

    const followup = await prisma.followUp.create({
      data: {
        ...followupData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(followup, { status: 201 });
  } catch (error) {
    console.error('POST /api/followups error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
