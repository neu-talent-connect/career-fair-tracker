import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/interviews/:id - Update an interview
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, userId, createdAt, ...updateData } = body;

    const interview = await prisma.interview.updateMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: updateData,
    });

    if (interview.count === 0) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    const updatedInterview = await prisma.interview.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(updatedInterview);
  } catch (error) {
    console.error('PUT /api/interviews/:id error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/interviews/:id - Delete an interview
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const interview = await prisma.interview.deleteMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (interview.count === 0) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/interviews/:id error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
