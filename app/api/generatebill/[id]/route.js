import { NextResponse } from 'next/server';
import connectDB from '@/database/connectDB';
import Patient from '@/models/Patient';
import GeneratedBill from '@/models/GeneratedBill';

export async function GET(request, { params }) {
  try {
    await connectDB();

    // Fetch the patient data
    const patient = await Patient.findById(params.id).lean();

    if (!patient) {
      return NextResponse.json(
        { success: false, message: 'Patient not found' },
        { status: 404 }
      );
    }

    // Fetch the latest generated bill for this patient (if any)
    const existingBill = await GeneratedBill.findOne({ patientId: params.id })
      .sort({ generatedAt: -1 }) // Get the most recent bill
      .lean();

    return NextResponse.json({
      success: true,
      patient,
      existingBill: existingBill || null, // Return null if no bill exists
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch patient',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();
    const { rupeesDiscount, percentDiscount, finalAmount } = body;

    // Validate input
    if (
      typeof rupeesDiscount !== 'number' ||
      typeof percentDiscount !== 'number' ||
      typeof finalAmount !== 'number' ||
      rupeesDiscount < 0 ||
      percentDiscount < 0 ||
      percentDiscount > 100 ||
      finalAmount < 0
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid discount or final amount values' },
        { status: 400 }
      );
    }

    const patient = await Patient.findById(params.id).lean();

    if (!patient) {
      return NextResponse.json(
        { success: false, message: 'Patient not found' },
        { status: 404 }
      );
    }

    // Create a new GeneratedBill document
    const generatedBill = new GeneratedBill({
      patientId: patient._id,
      patientName: patient.patientName,
      mobile: patient.mobile,
      tests: patient.tests.map(test => ({
        testName: test.testName,
        testCode: test.testCode,
        price: test.price,
      })),
      subtotal: patient.totalPrice,
      rupeesDiscount: rupeesDiscount || 0,
      percentDiscount: percentDiscount || 0,
      finalAmount: finalAmount,
      status: 'Finalized',
    });

    await generatedBill.save();

    return NextResponse.json({
      success: true,
      bill: generatedBill,
    });
  } catch (error) {
    console.error('Error generating bill:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate bill',
        error: error.message,
      },
      { status: 500 }
    );
  }
}