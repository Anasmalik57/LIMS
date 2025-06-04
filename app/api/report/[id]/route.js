import { NextResponse } from "next/server";
import Patient from "@/models/Patient";
import connectDB from "@/database/connectDB";

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Find the patient report by ID
    const report = await Patient.findById(id);
    
    if (!report) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report: report
    });

  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const updateData = await request.json();
    
    // Find and update the patient report
    const updatedReport = await Patient.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedReport) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report: updatedReport,
      message: "Report updated successfully"
    });

  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update report" },
      { status: 500 }
    );
  }
}