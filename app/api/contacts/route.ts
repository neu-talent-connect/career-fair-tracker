import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/contacts - Get all contacts for authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await prisma.contact.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('GET /api/contacts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/contacts - Create a new contact
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Remove id if provided (let Prisma generate it)
    const { id, ...contactData } = body;

    const contact = await prisma.contact.create({
      data: {
        ...contactData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('POST /api/contacts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
