import { NextResponse } from "next/server";
import Patient from "@/models/Patient";
import connectDB from "@/database/connectDB";

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    const report = await Patient.findById(id).lean(); // Use lean() for better performance
    if (!report) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report,
    });

  } catch (error) {
    console.error("Error fetching report:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch report", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    const updateData = await request.json();
    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "Update data is required" },
        { status: 400 }
      );
    }

    const updatedReport = await Patient.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedReport) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report: updatedReport,
      message: "Report updated successfully",
    });

  } catch (error) {
    console.error("Error updating report:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update report", error: error.message },
      { status: 500 }
    );
  }
}