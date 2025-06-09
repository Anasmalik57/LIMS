import { NextResponse } from 'next/server';
 // Your database connection file
import GeneratedBill from '@/models/GeneratedBill'; // Your model file
import connectDB from '@/database/connectDB';

export async function GET(request) {
  try {
    await connectDB();

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 100;
    const sortBy = searchParams.get('sortBy') || 'newest';

    // Build sort object
    let sortObj = {};
    switch (sortBy) {
      case 'newest':
        sortObj = { generatedAt: -1 };
        break;
      case 'oldest':
        sortObj = { generatedAt: 1 };
        break;
      case 'amount-high':
        sortObj = { finalAmount: -1 };
        break;
      case 'amount-low':
        sortObj = { finalAmount: 1 };
        break;
      case 'name':
        sortObj = { patientName: 1 };
        break;
      default:
        sortObj = { generatedAt: -1 };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch bills with pagination and sorting
    const bills = await GeneratedBill.find({})
      .populate('patientId', 'name mobile') // If you want to populate patient data
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    // Get total count for pagination
    const totalBills = await GeneratedBill.countDocuments({});

    // Calculate pagination info
    const totalPages = Math.ceil(totalBills / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      bills,
      pagination: {
        currentPage: page,
        totalPages,
        totalBills,
        hasNextPage,
        hasPrevPage,
        limit
      }
    });

  } catch (error) {
    console.error('Error fetching bills:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch bills',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method if you want to create bills via API
export async function POST(request) {
  try {
    await connectDB();
    
    const billData = await request.json();
    
    // Create new bill
    const newBill = new GeneratedBill(billData);
    await newBill.save();

    return NextResponse.json({
      success: true,
      message: 'Bill created successfully',
      bill: newBill
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating bill:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create bill',
        message: error.message 
      },
      { status: 500 }
    );
  }
}