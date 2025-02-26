import { NextResponse } from 'next/server';
import mockData from '@/app/data/testData.json';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 