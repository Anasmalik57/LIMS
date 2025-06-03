import connectDB from "@/database/connectDB";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";


// PUT request to update report by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Validate if ID is provided
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      patientName,
      mobile,
      age,
      gender,
      collectedBy,
      refBy,
      address,
      tests,
      cbc001,
    } = body;

    // Validate required fields
    if (!patientName || !mobile || !age || !gender) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Check if report exists
    const existingReport = await Patient.findById(id);
    if (!existingReport) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    // Calculate total price if tests are provided
    let totalPrice = existingReport.totalPrice;
    if (tests && Array.isArray(tests)) {
      totalPrice = tests.reduce((sum, test) => sum + (test.price || 0), 0);
    }

    // Prepare update data
    const updateData = {
      patientName: patientName.trim(),
      mobile: mobile.trim(),
      age: parseInt(age),
      gender,
      totalPrice,
    };

    // Add optional fields if provided
    if (collectedBy !== undefined) {
      updateData.collectedBy = collectedBy.trim();
    }
    if (refBy !== undefined) {
      updateData.refBy = refBy.trim();
    }
    if (address !== undefined) {
      updateData.address = address.trim();
    }

    // Update tests if provided
    if (tests && Array.isArray(tests)) {
      updateData.tests = tests.map(test => ({
        testName: test.testName,
        testCode: test.testCode,
        price: test.price || 0,
        status: test.status || "Pending",
        result: test.result || "",
      }));
    }

    // Update CBC001 data if provided
    if (cbc001 && typeof cbc001 === 'object') {
      updateData.cbc001 = {
        hemoglobin: cbc001.hemoglobin || "N/A",
        totalRBC: cbc001.totalRBC || "N/A",
        totalWBC: cbc001.totalWBC || "N/A",
        polymorphs: cbc001.polymorphs || "N/A",
        lymphocytes: cbc001.lymphocytes || "N/A",
        eosinophils: cbc001.eosinophils || "N/A",
        monocytes: cbc001.monocytes || "N/A",
        basophils: cbc001.basophils || "N/A",
        plateletCount: cbc001.plateletCount || "N/A",
        hct: cbc001.hct || "N/A",
        mcv: cbc001.mcv || "N/A",
        mch: cbc001.mch || "N/A",
        mchc: cbc001.mchc || "N/A",
        rdw: cbc001.rdw || "N/A",
        mpv: cbc001.mpv || "N/A",
      };
    }

    // Update the report
    const updatedReport = await Patient.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validations
      }
    );

    return NextResponse.json({
      success: true,
      message: "Report updated successfully",
      report: updatedReport,
    });

  } catch (error) {
    console.error("Error updating report:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, message: `Validation Error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }

    // Handle duplicate key error (mobile number)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Mobile number already exists" },
        { status: 400 }
      );
    }

    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, message: "Invalid report ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET request to fetch report by ID (for the edit form)
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Validate if ID is provided
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    // Find the patient/report by ID
    const report = await Patient.findById(id);

    if (!report) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report: report,
    });

  } catch (error) {
    console.error("Error fetching report:", error);

    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, message: "Invalid report ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}