import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    // Basic patient info
    patientName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Patient name must be at least 2 characters long"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, "Mobile number must be at least 10 characters long"],
    },
    age: {
      type: Number,
      required: true,
      min: [1, "Age must be at least 1"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    done: { type: Boolean, default: false },

    // Optional fields
    collectedBy: {
      type: String,
      minlength: [2, "Collected by must be at least 2 characters long"],
    },
    refBy: {
      type: String,
      minlength: [2, "Referred by must be at least 2 characters long"],
    },
    address: {
      type: String,
      minlength: [5, "Address must be at least 5 characters long"],
    },

    // Tests array with pricing
    tests: [
      {
        testName: {
          type: String,
          required: true,
          minlength: [2, "Test name must be at least 2 characters long"],
        },
        testCode: {
          type: String,
          required: true,
          minlength: [2, "Test code must be at least 2 characters long"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
          default: 0,
        },
        status: {
          type: String,
          enum: ["Pending", "Completed"],
          default: "Pending",
        },
        result: {
          type: String,
          default: "",
        },
      },
    ],

    // Total price for all tests
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price cannot be negative"],
      default: 0,
    },

    // Test Results organized by test codes
    testResults: {
      // Hematology Report Fields (CBC - CBC001)
      cbc001: {
        // Basic blood counts
        hemoglobin: { type: String, default: "" },
        totalRBC: { type: String, default: "" },
        totalWBC: { type: String, default: "" },

        // Differential count
        polymorphs: { type: String, default: "" },
        lymphocytes: { type: String, default: "" },
        eosinophils: { type: String, default: "" },
        monocytes: { type: String, default: "" },
        basophils: { type: String, default: "" },

        // Platelet count
        plateletCount: { type: String, default: "" },

        // Blood indices
        hct: { type: String, default: "" }, // H.C.T.
        mcv: { type: String, default: "" }, // M.C.V.
        mch: { type: String, default: "" }, // M.C.H.
        mchc: { type: String, default: "" }, // M.C.H.C.
        rdw: { type: String, default: "" }, // R.D.W.
        mpv: { type: String, default: "" }, // M.P.V.
      },

      // Widal Test Fields (WID001 - Serology)
      wid001: {
        salmonellaO: { type: String, default: "" },
        salmonellaH: { type: String, default: "" },
        widalConclusion: { type: String, default: "" },
      },

      // Biochemistry Report Fields (BCM001)
      bcm001: {
        // Liver function tests
        totalBilirubin: { type: String, default: "" },
        directBilirubin: { type: String, default: "" },
        indirectBilirubin: { type: String, default: "" },
        sgot: { type: String, default: "" }, // AST
        sgpt: { type: String, default: "" }, // ALT
        alkalinePhosphatase: { type: String, default: "" },

        // Kidney function tests
        bloodUrea: { type: String, default: "" }, // Renamed from 'urea'
        serumCreatinine: { type: String, default: "" }, // Renamed from 'creatinine'
        serumUricAcid: { type: String, default: "" }, // Renamed from 'uricAcid'

        // Lipid profile
        totalCholesterol: { type: String, default: "" },
        triglycerides: { type: String, default: "" },
        hdlCholesterol: { type: String, default: "" },
        ldlCholesterol: { type: String, default: "" },

        // Blood sugar
        fastingGlucose: { type: String, default: "" },
        randomGlucose: { type: String, default: "" },
      },

      // Microscopy Report Fields (MCP001)
      mcp001: {
        // Urine microscopy
        urineColor: { type: String, default: "" }, // Renamed from 'color'
        urineAppearance: { type: String, default: "" }, // Renamed from 'appearance'
        pusCells: { type: String, default: "" },
        urineRBC: { type: String, default: "" }, // Renamed from 'redBloodCells'
        epithelialCells: { type: String, default: "" },
        casts: { type: String, default: "" },
        crystals: { type: String, default: "" },
        bacteria: { type: String, default: "" },

        // Stool microscopy
        ova: { type: String, default: "" },
        cysts: { type: String, default: "" },
        mucus: { type: String, default: "" },
        occultBlood: { type: String, default: "" },
      },
    },
  },
  {
    timestamps: true, // Auto createdAt & updatedAt
    // Ensure strict mode for better validation
    strict: true,
    // Optimize for queries
    collection: "patients",
  }
);

// Add indexes for better performance
PatientSchema.index({ mobile: 1 });
PatientSchema.index({ patientName: 1 });
PatientSchema.index({ createdAt: -1 });

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);
