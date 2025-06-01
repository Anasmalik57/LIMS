import connectDB from "@/database/connectDB";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Fetch all doctors from database
    const doctors = await Doctor.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Use lean() for better performance
    
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { 
        message: 'Error fetching doctors',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// For App Router (if using Next.js 13+ with app directory)
// Create this as /app/api/doctors/route.js instead:

/*

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    const doctors = await Doctor.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { message: 'Error fetching doctors', error: error.message },
      { status: 500 }
    );
  }
}
*/