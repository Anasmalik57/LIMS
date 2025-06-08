import mongoose from "mongoose";

// =================== CLEAR EXISTING MODEL CACHE ===================
// This is the key fix - delete the cached model to force re-registration
if (mongoose.models.Patient) {
  delete mongoose.models.Patient;
}

const PatientSchema = new mongoose.Schema(
  {
    // =================== BASIC PATIENT INFORMATION ===================
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
    done: { 
      type: Boolean, 
      default: false 
    },

    // =================== OPTIONAL FIELDS ===================
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

    // =================== TESTS ARRAY WITH PRICING ===================
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

    // =================== TOTAL PRICE FOR ALL TESTS ===================
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price cannot be negative"],
      default: 0,
    },

    // =================== TEST RESULTS ORGANIZED BY TEST CODES ===================
    testResults: {
      // ============= HEMATOLOGY REPORT - Complete Blood Count (CBC) - CBC001 =============
      cbc001: {
        // Basic blood counts
        hemoglobin: { type: String, default: "" },
        totalRBC: { type: String, default: "" },
        totalWBC: { type: String, default: "" },

        // Differential count (%)
        polymorphs: { type: String, default: "" },
        lymphocytes: { type: String, default: "" },
        eosinophils: { type: String, default: "" },
        monocytes: { type: String, default: "" },
        basophils: { type: String, default: "" },

        // Platelet count
        plateletCount: { type: String, default: "" },

        // Blood indices
        hct: { type: String, default: "" }, // Hematocrit (H.C.T.)
        mcv: { type: String, default: "" }, // Mean Corpuscular Volume (M.C.V.)
        mch: { type: String, default: "" }, // Mean Corpuscular Hemoglobin (M.C.H.)
        mchc: { type: String, default: "" }, // Mean Corpuscular Hemoglobin Concentration (M.C.H.C.)
        rdw: { type: String, default: "" }, // Red Cell Distribution Width (R.D.W.)
        mpv: { type: String, default: "" }, // Mean Platelet Volume (M.P.V.)
      },

      // ============= SEROLOGY - Widal Test - WID001 =============
      wid001: {
        salmonellaO: { type: String, default: "" }, // Salmonella Typhi O antigen
        salmonellaH: { type: String, default: "" }, // Salmonella Typhi H antigen
        widalConclusion: { type: String, default: "" }, // Test conclusion
      },

      // ============= BIOCHEMISTRY - Liver Function Test (LFT) - BCM001 =============
      bcm001: {
        // Bilirubin tests
        totalBilirubin: { type: String, default: "" },
        directBilirubin: { type: String, default: "" },
        indirectBilirubin: { type: String, default: "" },
        
        // Liver enzymes
        sgpt: { type: String, default: "" }, // ALT (Alanine Aminotransferase)
        sgot: { type: String, default: "" }, // AST (Aspartate Aminotransferase)
        alkalinePhosphatase: { type: String, default: "" },

        // Protein tests
        totalProtein: { type: String, default: "" },
        albumin: { type: String, default: "" },
        globulin: { type: String, default: "" },
        agRatio: { type: String, default: "" }, // Albumin/Globulin ratio

        // Additional notes
        description: { type: String, default: "" },
      },

      // ============= RAPID TEST - Typhi DOT (Rapid) - TDR001 =============
      tdr001: {
        styphiIgG: { type: String, default: "" },
        styphiIgM: { type: String, default: "" },
        method: { type: String, default: "Rapid Card Test" },
        description: { type: String, default: "" },
      },

      // ============= SEROLOGY - VDRL Report - VDR001 =============
      vdr001: {
        vdrlResult: { type: String, default: "" }, // Reactive/Non-reactive
        description: { type: String, default: "" },
      },

      // ============= BIOCHEMISTRY - Renal Function Test (RFT) - RFT001 =============
      rft001: {
        bloodUrea: { type: String, default: "" },
        bun: { type: String, default: "" }, // Blood Urea Nitrogen
        sCreatinine: { type: String, default: "" }, // Serum Creatinine
        serumUricAcid: { type: String, default: "" },
        
        // Protein tests
        totalProtein: { type: String, default: "" },
        sAlbumin: { type: String, default: "" }, // Serum Albumin
        sGlobulin: { type: String, default: "" }, // Serum Globulin
        agRatio: { type: String, default: "" }, // A/G Ratio
      },

      // ============= BIOCHEMISTRY - Uric Acid - URI001 =============
      uri001: {
        serumUricAcid: { type: String, default: "" },
      },

      // ============= BIOCHEMISTRY - S. Creatinine - SCR001 =============
      scr001: {
        sCreatinine: { type: String, default: "" },
      },

      // ============= BIOCHEMISTRY - Lipid Profile - LIP001 =============
      lip001: {
        serumTotalCholesterol: { type: String, default: "" },
        serumTriglyceride: { type: String, default: "" },
        hdlCholesterol: { type: String, default: "" },
        sLDLCholesterol: { type: String, default: "" },
        sVLDLCholesterol: { type: String, default: "" },
        nonHDLCholesterol: { type: String, default: "" },
        cholesterolHDLRatio: { type: String, default: "" },
        ldlHDLRatio: { type: String, default: "" },
      },

      // ============= ANTENATAL PROFILE - ANT001 =============
      ant001: {
        // Basic blood parameters
        hemoglobin: { type: String, default: "" },
        totalWBC: { type: String, default: "" },
        rbc: { type: String, default: "" }, // Red Blood Cell count
        plateletCount: { type: String, default: "" },
        
        // Blood Group & RH Typing
        bgRh: { type: String, default: "" },
        
        // Blood sugar and serology
        rbs: { type: String, default: "" }, // Random Blood Sugar
        vdrl: { type: String, default: "" },
        hiv: { type: String, default: "" },
        hbsag: { type: String, default: "" },
      },

      // ============= COAGULATION - D-Dimer - DDI001 =============
      ddi001: {
        dDimer: { type: String, default: "" },
        description: { type: String, default: "" },
      },

      // ============= COAGULATION - BTCT (Bleeding Time & Clotting Time) - BTC001 =============
      btc001: {
        bleedingTime: { type: String, default: "" },
        clottingTime: { type: String, default: "" },
        description: { type: String, default: "" },
      },

      // ============= IMMUNOLOGY - RA-ASO-CRP - RAA001 =============
      raa001: {
        rfa: { type: String, default: "" }, // Rheumatoid Factor Assay
        asoTest: { type: String, default: "" },
        crpTest: { type: String, default: "" },
      },

      // ============= BIOCHEMISTRY - S.G.O.T. - SGT001 =============
      sgt001: {
        sgot: { type: String, default: "" },
      },

      // ============= COAGULATION - Coagulation Profile - COA001 =============
      coa001: {
        // Bleeding and Clotting Time
        coagBleedingTimeMin: { type: String, default: "" },
        coagBleedingTimeSec: { type: String, default: "" },
        coagClottingTimeMin: { type: String, default: "" },
        coagClottingTimeSec: { type: String, default: "" },
        
        // Coagulation parameters
        coagClotRetraction: { type: String, default: "" },
        hemoPlateletCount: { type: String, default: "" },
        
        // Prothrombin Time
        coagProthrombinTimeControl: { type: String, default: "" },
        coagProthrombinTimePatient: { type: String, default: "" },
        coagINR: { type: String, default: "" },
        coagISI: { type: String, default: "" },
        coagProthrombinIndex: { type: String, default: "" },
        coagProthrombinRatio: { type: String, default: "" },
        
        // APTT
        coagAPTTTest: { type: String, default: "" },
        coagAPTTControl: { type: String, default: "" },
        
        // Additional coagulation tests
        coagFDP: { type: String, default: "" },
        coagFactorXIIIScreening: { type: String, default: "" },
        coagThrombinTime: { type: String, default: "" },
        plasmaRecalcificationTime: { type: String, default: "" },
        factorVIIIAssay: { type: String, default: "" },
        dDimer: { type: String, default: "" },
        plasmaFibrinogen: { type: String, default: "" },
        
        // Notes
        coagNote: { type: String, default: "" },
      },

      // ============= HEMATOLOGY - AEC (Absolute Eosinophil Count) - AEC001 =============
      aec001: {
        totalEAC: { type: String, default: "" },
      },

      // ============= BIOCHEMISTRY - Serum Electrolytes - SER001 =============
      ser001: {
        sodium: { type: String, default: "" },
        potassium: { type: String, default: "" },
        chlorides: { type: String, default: "" },
        calcium: { type: String, default: "" },
        elecInorganicPhosphorous: { type: String, default: "" },
        elecLithium: { type: String, default: "" },
        splBicarbonate: { type: String, default: "" },
        elecMagnesium: { type: String, default: "" },
        
        // Method and instrument details
        method: {
          type: String,
          default: "ION Selected Electrodes (ISE) Direct",
        },
        instrumentUsed: {
          type: String,
          default: "YUCCA SENSA CORE Electrolyte Analyzer",
        },
        description: { type: String, default: "" },
      },

      // ============= CARDIOLOGY - Troponin-T - TPT001 =============
      tpt001: {
        troponin: { type: String, default: "" }, // Negative or Positive
      },

      // ============= SEROLOGY - Blood Group - BLG001 =============
      blg001: {
        aboGroupingSystem: { type: String, default: "" }, // Blood groups like "A", "B", "AB", "O"
        rhoTyping: { type: String, default: "" }, // Positive or Negative
      },

      // ============= MICROBIOLOGY - MP (Malaria Parasites) - MPM001 =============
      mpm001: {
        malariaParasites: { type: String, default: "" },
        method: { type: String, default: "Microscopic Examination" },
      },

      // ============= IMMUNOLOGY - RA Factor - RAF001 =============
      raf001: {
        rheumatoidFactorAssay: { type: String, default: "" },
        description: { type: String, default: "" },
      },

      // ============= IMMUNOLOGY - C. Reactive Protein (C.R.P.) - CRP001 =============
      crp001: {
        crp: { type: String, default: "" },
        description: { type: String, default: "" },
      },

      // ============= SEROLOGY - SCRUB TYPHUS (Anti Body) - ANT002 =============
      ant002: {
        igg: { type: String, default: "" }, // IgG Antibody
        igm: { type: String, default: "" }, // IgM Antibody
      },

      // ============= BIOCHEMISTRY - Hb A1c (Glycated Hemoglobin) - HBA001 =============
      hba001: {
        glycatedHemoglobin: { type: String, default: "" },
        estimatedAverageGlucose: { type: String, default: "" },
      },

      // ============= HORMONES - Beta HCG (Hormones Assay) - BET001 =============
      bet001: {
        betaHCG: { type: String, default: "" }, // Positive or Negative
        description: { type: String, default: "" },
      },

      // ============= SEROLOGY - HIV I-II - HIV001 =============
      hiv001: {
        hivIII: { type: String, default: "" },
      },

      // ============= SEROLOGY - HBSAG - HBS001 =============
      hbs001: {
        hepatitisBSurfaceAntigen: { type: String, default: "" }, // Australian Antigen
        doneBy: { type: String, default: "Rapid Card Method" },
      },

      // ============= SEROLOGY - Anti HCV - ANT003 =============
      ant003: {
        hepatitisCSurfaceAntigen: { type: String, default: "" }, // Reactive or Non-reactive
      },

      // ============= ENDOCRINOLOGY - Thyroid Function Test (TFT) - TFT001 =============
      tft001: {
        totalT3: { type: String, default: "" },
        totalT4: { type: String, default: "" },
        tsh: { type: String, default: "" }, // TSH (Thyroid Stimulating Hormone)
        description: { type: String, default: "" },
      },
    },
  },
  {
    timestamps: true, // Auto createdAt & updatedAt
    strict: true, // Ensure strict mode for better validation
    collection: "patients", // Optimize for queries
  }
);

// =================== INDEXES FOR BETTER PERFORMANCE ===================
PatientSchema.index({ mobile: 1 });
PatientSchema.index({ patientName: 1 });
PatientSchema.index({ createdAt: -1 });

// =================== FORCE MODEL RE-REGISTRATION ===================
// Always create a fresh model instance
const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;