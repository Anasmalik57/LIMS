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
      totalPrice,
      testResults,
    } = body;

    // Validate required fields
    if (!patientName || !mobile || !age || !gender || !totalPrice) {
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

    // Prepare update data
    const updateData = {
      patientName: patientName.trim(),
      mobile: mobile.trim(),
      age: parseInt(age),
      gender,
      totalPrice: parseFloat(totalPrice),
      tests:
        tests && Array.isArray(tests)
          ? tests.map((test) => ({
              testName: test.testName || "",
              testCode: test.testCode || "",
              price: parseFloat(test.price) || 0,
              status: test.status || "Pending",
              result: test.result || "",
            }))
          : existingReport.tests,
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

    // Update testResults if provided
    if (testResults && typeof testResults === "object") {
      updateData.testResults = {
        cbc001:
          testResults.cbc001 && typeof testResults.cbc001 === "object"
            ? {
                hemoglobin: testResults.cbc001.hemoglobin || "",
                totalRBC: testResults.cbc001.totalRBC || "",
                totalWBC: testResults.cbc001.totalWBC || "",
                polymorphs: testResults.cbc001.polymorphs || "",
                lymphocytes: testResults.cbc001.lymphocytes || "",
                eosinophils: testResults.cbc001.eosinophils || "",
                monocytes: testResults.cbc001.monocytes || "",
                basophils: testResults.cbc001.basophils || "",
                plateletCount: testResults.cbc001.plateletCount || "",
                hct: testResults.cbc001.hct || "",
                mcv: testResults.cbc001.mcv || "",
                mch: testResults.cbc001.mch || "",
                mchc: testResults.cbc001.mchc || "",
                rdw: testResults.cbc001.rdw || "",
                mpv: testResults.cbc001.mpv || "",
              }
            : existingReport.testResults.cbc001,
        wid001:
          testResults.wid001 && typeof testResults.wid001 === "object"
            ? {
                salmonellaO: testResults.wid001.salmonellaO || "",
                salmonellaH: testResults.wid001.salmonellaH || "",
                widalConclusion: testResults.wid001.widalConclusion || "",
              }
            : existingReport.testResults.wid001,
        bcm001:
          testResults.bcm001 && typeof testResults.bcm001 === "object"
            ? {
                totalBilirubin: testResults.bcm001.totalBilirubin || "",
                directBilirubin: testResults.bcm001.directBilirubin || "",
                indirectBilirubin: testResults.bcm001.indirectBilirubin || "",
                sgot: testResults.bcm001.sgot || "",
                sgpt: testResults.bcm001.sgpt || "",
                alkalinePhosphatase:
                  testResults.bcm001.alkalinePhosphatase || "",
                bloodUrea: testResults.bcm001.bloodUrea || "",
                serumCreatinine: testResults.bcm001.serumCreatinine || "",
                serumUricAcid: testResults.bcm001.serumUricAcid || "",
                totalCholesterol: testResults.bcm001.totalCholesterol || "",
                triglycerides: testResults.bcm001.triglycerides || "",
                hdlCholesterol: testResults.bcm001.hdlCholesterol || "",
                ldlCholesterol: testResults.bcm001.ldlCholesterol || "",
                fastingGlucose: testResults.bcm001.fastingGlucose || "",
                randomGlucose: testResults.bcm001.randomGlucose || "",
              }
            : existingReport.testResults.bcm001,
        mcp001:
          testResults.mcp001 && typeof testResults.mcp001 === "object"
            ? {
                urineColor: testResults.mcp001.urineColor || "",
                urineAppearance: testResults.mcp001.urineAppearance || "",
                pusCells: testResults.mcp001.pusCells || "",
                urineRBC: testResults.mcp001.urineRBC || "",
                epithelialCells: testResults.mcp001.epithelialCells || "",
                casts: testResults.mcp001.casts || "",
                crystals: testResults.mcp001.crystals || "",
                bacteria: testResults.mcp001.bacteria || "",
                ova: testResults.mcp001.ova || "",
                cysts: testResults.mcp001.cysts || "",
                mucus: testResults.mcp001.mucus || "",
                occultBlood: testResults.mcp001.occultBlood || "",
              }
            : existingReport.testResults.mcp001,
      };
    }

    // Update the report
    const updatedReport = await Patient.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        strict: true,
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
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          success: false,
          message: `Validation Error: ${validationErrors.join(", ")}`,
        },
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
    if (error.name === "CastError") {
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
    if (error.name === "CastError") {
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
