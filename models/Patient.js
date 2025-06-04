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
          minlength: [0, "Result must be at least 0 character long"],
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

    // Hematology Report Fields (CBC - CBC001)
    cbc001: {
      // Basic blood counts
      hemoglobin: { type: String, default: "N/A" },
      totalRBC: { type: String, default: "N/A" },
      totalWBC: { type: String, default: "N/A" },

      // Differential count
      polymorphs: { type: String, default: "N/A" },
      lymphocytes: { type: String, default: "N/A" },
      eosinophils: { type: String, default: "N/A" },
      monocytes: { type: String, default: "N/A" },
      basophils: { type: String, default: "N/A" },

      // Platelet count
      plateletCount: { type: String, default: "N/A" },

      // Blood indices
      hct: { type: String, default: "N/A" }, // H.C.T.
      mcv: { type: String, default: "N/A" }, // M.C.V.
      mch: { type: String, default: "N/A" }, // M.C.H.
      mchc: { type: String, default: "N/A" }, // M.C.H.C.
      rdw: { type: String, default: "N/A" }, // R.D.W.
      mpv: { type: String, default: "N/A" }, // M.P.V.
    },

    // Widal Test Fields (WID001 - Serology)
    wid001: {
      salmonellaO: { type: String, default: "N/A" },
      salmonellaH: { type: String, default: "N/A" },
      widalConclusion: { type: String, default: "N/A" },
    },

    // Biochemistry Report Fields (BCM001)
    bcm001: {
      // Liver function tests
      totalBilirubin: { type: String, default: "N/A" },
      directBilirubin: { type: String, default: "N/A" },
      indirectBilirubin: { type: String, default: "N/A" },
      sgot: { type: String, default: "N/A" }, // AST
      sgpt: { type: String, default: "N/A" }, // ALT
      alkalinePhosphatase: { type: String, default: "N/A" },

      // Kidney function tests
      urea: { type: String, default: "N/A" },
      creatinine: { type: String, default: "N/A" },
      uricAcid: { type: String, default: "N/A" },

      // Lipid profile
      totalCholesterol: { type: String, default: "N/A" },
      triglycerides: { type: String, default: "N/A" },
      hdlCholesterol: { type: String, default: "N/A" },
      ldlCholesterol: { type: String, default: "N/A" },

      // Blood sugar
      fastingGlucose: { type: String, default: "N/A" },
      randomGlucose: { type: String, default: "N/A" },
    },

    // Microscopy Report Fields (MCP001)
    mcp001: {
      // Urine microscopy
      color: { type: String, default: "N/A" },
      appearance: { type: String, default: "N/A" },
      pusCells: { type: String, default: "N/A" },
      redBloodCells: { type: String, default: "N/A" },
      epithelialCells: { type: String, default: "N/A" },
      casts: { type: String, default: "N/A" },
      crystals: { type: String, default: "N/A" },
      bacteria: { type: String, default: "N/A" },

      // Stool microscopy
      ova: { type: String, default: "N/A" },
      cysts: { type: String, default: "N/A" },
      mucus: { type: String, default: "N/A" },
      occultBlood: { type: String, default: "N/A" },
    },
  },
  {
    timestamps: true, // Auto createdAt & updatedAt
  }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);