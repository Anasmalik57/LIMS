import { NextResponse } from 'next/server';
import connectDB from '@/database/connectDB';
import Patient from '@/models/Patient';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all reports and sort by createdAt in descending order (most recent first)
    const reports = await Patient.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      reports: reports,
      count: reports.length
    });
    
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch reports',
        error: error.message
      },
      { status: 500 }
    );
  }
}