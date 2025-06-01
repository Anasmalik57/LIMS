import connectDB from "@/database/connectDB";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

// GET request to fetch report by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate if ID is provided
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Report ID is required"
      }, { status: 400 });
    }

    // Find the patient/report by ID
    const report = await Patient.findById(id);
    
    if (!report) {
      return NextResponse.json({
        success: false,
        message: "Report not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      report: report
    });

  } catch (error) {
    console.error("Error fetching report:", error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return NextResponse.json({
        success: false,
        message: "Invalid report ID format"
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}