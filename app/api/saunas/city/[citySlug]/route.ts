import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Sauna from '@/models/Sauna';

export async function GET(
  request: Request,
  { params }: { params: { citySlug: string } }
) {
  const { citySlug } = params;

  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { error: 'MongoDB URI is not defined' },
      { status: 500 }
    );
  }

  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Find saunas by citySlug
    const saunas = await Sauna.find({ citySlug });

    return NextResponse.json(saunas);
  } catch (error) {
    console.error('Error fetching saunas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saunas' },
      { status: 500 }
    );
  }
} 