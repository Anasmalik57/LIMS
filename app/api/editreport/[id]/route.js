import connectDB from "@/database/connectDB";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

// Define schema fields for validation
const TEST_RESULT_FIELDS = {
  cbc001: [
    "hemoglobin",
    "totalRBC",
    "totalWBC",
    "polymorphs",
    "lymphocytes",
    "eosinophils",
    "monocytes",
    "basophils",
    "plateletCount",
    "hct",
    "mcv",
    "mch",
    "mchc",
    "rdw",
    "mpv",
  ],
  wid001: ["salmonellaO", "salmonellaH", "widalConclusion"],
  bcm001: [
    "totalBilirubin",
    "directBilirubin",
    "indirectBilirubin",
    "sgpt",
    "sgot",
    "alkalinePhosphatase",
    "totalProtein",
    "albumin",
    "globulin",
    "agRatio",
    "description",
  ],
  tdr001: ["styphiIgG", "styphiIgM", "method", "description"],
  vdr001: ["vdrlResult", "description"],
  rft001: [
    "bloodUrea",
    "bun",
    "sCreatinine",
    "serumUricAcid",
    "totalProtein",
    "sAlbumin",
    "sGlobulin",
    "agRatio",
  ],
  uri001: ["serumUricAcid"],
  scr001: ["sCreatinine"],
  lip001: [
    "serumTotalCholesterol",
    "serumTriglyceride",
    "hdlCholesterol",
    "sLDLCholesterol",
    "sVLDLCholesterol",
    "nonHDLCholesterol",
    "cholesterolHDLRatio",
    "ldlHDLRatio",
  ],
  ant001: [
    "hemoglobin",
    "totalWBC",
    "bgRh",
    "rbc",
    "rbs",
    "vdrl",
    "plateletCount",
    "hiv",
    "hbsag",
  ],
  ddi001: ["dDimer", "description"],
  btc001: ["bleedingTime", "clottingTime", "description"],
  raa001: ["rfa", "asoTest", "crpTest"],
  sgt001: ["sgot"],
  coa001: [
    "coagBleedingTimeMin",
    "coagBleedingTimeSec",
    "coagClottingTimeMin",
    "coagClottingTimeSec",
    "coagClotRetraction",
    "hemoPlateletCount",
    "coagProthrombinTimeControl",
    "coagProthrombinTimePatient",
    "coagINR",
    "coagISI",
    "coagProthrombinIndex",
    "coagProthrombinRatio",
    "coagAPTTTest",
    "coagAPTTControl",
    "coagFDP",
    "coagFactorXIIIScreening",
    "coagThrombinTime",
    "plasmaRecalcificationTime",
    "factorVIIIAssay",
    "dDimer",
    "plasmaFibrinogen",
    "coagNote",
  ],
  aec001: ["totalEAC"],
  ser001: [
    "sodium",
    "potassium",
    "chlorides",
    "calcium",
    "elecInorganicPhosphorous",
    "elecLithium",
    "splBicarbonate",
    "elecMagnesium",
    "method",
    "instrumentUsed",
    "description",
  ],
  tpt001: ["troponin"],
  blg001: ["aboGroupingSystem", "rhoTyping"],
  mpm001: ["malariaParasites", "method"],
  raf001: ["rheumatoidFactorAssay", "description"],
  crp001: ["crp", "description"],
  ant002: ["igg", "igm"],
  hba001: ["glycatedHemoglobin", "estimatedAverageGlucose"],
  bet001: ["betaHCG", "description"],
  hiv001: ["hivIII"],
  hbs001: ["hepatitisBSurfaceAntigen", "doneBy"],
  ant003: ["hepatitisCSurfaceAntigen"],
  tft001: ["totalT3", "totalT4", "tsh", "description"],
  mcp001: [
    "urineColor",
    "urineAppearance",
    "pusCells",
    "urineRBC",
    "epithelialCells",
    "casts",
    "crystals",
    "bacteria",
    "ova",
    "cysts",
    "mucus",
    "occultBlood",
  ],
  gtt001: [
    "glucoseToleranceTest",
    "fglb",
    "fugl",
    "g1pgl",
    "ugl1h",
    "g2pgl",
    "ugl2h",
    "g3pgl",
    "ugl3h",
    "description1",
    "description2",
  ],
  mxt001: ["inDiameter", "result"],
  hmg001: [
    "hemoglobin",
    "totalRBC",
    "totalWBC",
    "lymphocytes",
    "eosinophils",
    "monocytes",
    "basophils",
    "polymorphs",
  ],
  esr001: ["esr1h", "esrAvg"],
  mps001: ["malariaPArasites", "method"],
  pgt001: [
    "pregnancyTestSample",
    "lmp",
    "pregnancyTestResult",
    "pregnancyIndi",
    "pregnancySenstivity",
    "method",
  ],
  ura001: [
    "color",
    "transparency",
    "reaction",
    "specificGravity",
    "protein",
    "sugar",
    "ketone",
    "bilePigment",
    "bileSalt",
    "urobilinogen",
    "pusCells",
    "rbc",
    "morphologyOfRBC",
    "epithelialCells",
    "crystals",
    "casts",
    "amorphousCrystals",
    "backteriaFlora",
    "note",
  ],
  ldh001: [
    "ldh",
    "method",
    "description1",
    "description2",
    "description3",
    "description4",
  ],
  rbs001: ["randomBloodSugar", "method1", "method2"],
  fbs001: ["fastingBloodSugar"],
  ckg001: ["result"],
  brb001: [
    "bilirubinTotal",
    "serumMethod1",
    "bilirubinDirect",
    "serumMethod2",
    "bilirubinIndirect",
    "serumMethod3",
  ],
  sfr001: [
    "methodOfCollection",
    "periodOfAbstinence",
    "timeOfCollection",
    "timeOfExamination",
    "quantity",
    "color",
    "viscosity",
    "liquificationTIme",
    "reaction",
    "fructoseTest",
    "totalSpermCount",
    "motilityImmediate",
    "slugishlyMotil",
    "nonMotile",
    "motility",
    "abnormalFormsHead",
    "body",
    "tails",
    "immatureForms",
    "pusCells",
    "redCells",
    "epithelialCell",
    "autoAgglutination",
    "gramsStain",
    "totalSperCountAfterWash",
    "Impression",
  ],
  sml001: ["serumAmylase", "method", "description"],
  slp001: ["serumLipase", "method", "description"],
  sfb001: ["sputumForAFB_Stain"],
  kft001: [
    "urea",
    "creatine",
    "bun",
    "bunCreatineRatio",
    "uricAid",
    "sodium",
    "potassium",
  ],
  dii001: ["ns1Antigen", "dengueIgm", "dengueIgG", "description", "description1", "description2", "description3"],
};

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
      date,
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
      date,
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

    // Update testResults dynamically
    if (testResults && typeof testResults === "object") {
      updateData.testResults = Object.keys(TEST_RESULT_FIELDS).reduce(
        (acc, testCode) => {
          if (
            testResults[testCode] &&
            typeof testResults[testCode] === "object"
          ) {
            acc[testCode] = TEST_RESULT_FIELDS[testCode].reduce(
              (testAcc, field) => ({
                ...testAcc,
                [field]:
                  testResults[testCode][field] ||
                  existingReport.testResults[testCode]?.[field] ||
                  "",
              }),
              {}
            );
          } else {
            acc[testCode] = existingReport.testResults[testCode] || {};
          }
          return acc;
        },
        {}
      );
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
