import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/contacts/:id - Get a single contact
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contact = await prisma.contact.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('GET /api/contacts/:id error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/contacts/:id - Update a contact
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
    
    // Remove fields that shouldn't be updated
    const { id, userId, createdAt, ...updateData } = body;

    const contact = await prisma.contact.updateMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: updateData,
    });

    if (contact.count === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    // Fetch the updated contact
    const updatedContact = await prisma.contact.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('PUT /api/contacts/:id error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/contacts/:id - Delete a contact
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contact = await prisma.contact.deleteMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (contact.count === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/contacts/:id error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
