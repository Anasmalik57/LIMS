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

    // Transform the data to ensure all required fields are present
    const transformedReport = {
      _id: report._id,
      patientName: report.patientName,
      mobile: report.mobile,
      age: report.age,
      gender: report.gender,
      collectedBy: report.collectedBy || "Main Branch",
      refBy: report.refBy || "Self",
      address: report.address || "",
      tests: report.tests || [],
      totalPrice: report.totalPrice || 0,
      done: report.done || false,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
      
      // Include hematology fields (CBC - CBC001)
      cbc001: report.cbc001 ? {
        hemoglobin: report.cbc001.hemoglobin || "N/A",
        totalRBC: report.cbc001.totalRBC || "N/A",
        totalWBC: report.cbc001.totalWBC || "N/A",
        polymorphs: report.cbc001.polymorphs || "N/A",
        lymphocytes: report.cbc001.lymphocytes || "N/A",
        eosinophils: report.cbc001.eosinophils || "N/A",
        monocytes: report.cbc001.monocytes || "N/A",
        basophils: report.cbc001.basophils || "N/A",
        plateletCount: report.cbc001.plateletCount || "N/A",
        hct: report.cbc001.hct || "N/A",
        mcv: report.cbc001.mcv || "N/A",
        mch: report.cbc001.mch || "N/A",
        mchc: report.cbc001.mchc || "N/A",
        rdw: report.cbc001.rdw || "N/A",
        mpv: report.cbc001.mpv || "N/A"
      } : null,
      
      // Include Widal test fields (WID001)
      wid001: report.wid001 ? {
        salmonellaO: report.wid001.salmonellaO || "N/A",
        salmonellaH: report.wid001.salmonellaH || "N/A",
        widalConclusion: report.wid001.widalConclusion || "N/A"
      } : null
    };

    return NextResponse.json({
      success: true,
      report: transformedReport
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

// PUT request to update report by ID (optional - for edit functionality)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    // Validate if ID is provided
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Report ID is required"
      }, { status: 400 });
    }

    // Find and update the patient/report
    const updatedReport = await Patient.findByIdAndUpdate(
      id,
      { 
        $set: body,
        updatedAt: new Date()
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!updatedReport) {
      return NextResponse.json({
        success: false,
        message: "Report not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Report updated successfully",
      report: updatedReport
    });
   
  } catch (error) {
    console.error("Error updating report:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        message: "Validation error",
        errors: validationErrors
      }, { status: 400 });
    }
    
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