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
      default: false,
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
        description: {
          type: String,
          default:
            "• The pattern of liver test abnormality is hepatocellular. The AST is typically in the 100 to 200 IU/L range, even in severe disease, and the ALT level may be normal, even in severe cases. The AST level is higher than the ALT level, and the ratio is greater than 2:1 in 70% of patients",
        },
      },

      // ============= RAPID TEST - Typhi DOT (Rapid) - TDR001 =============
      tdr001: {
        styphiIgG: { type: String, default: "" },
        styphiIgM: { type: String, default: "" },
        method: { type: String, default: "Chromatographic Immunaassay" },
        description: {
          type: String,
          default:
            "• Typhidot is a medical test consisting of a dot ELISA kit that detects IgM and IgG antibodies against the outer membrane protein (OMP) of the Salmonella typhi. The typhidot test becomes positive within 2-3 days of infection and separately identifies IgM and IgG antibodies.",
        },
      },

      // ============= SEROLOGY - VDRL Report - VDR001 =============
      vdr001: {
        vdrlResult: { type: String, default: "" }, // Reactive/Non-reactive
        description: {
          type: String,
          default:
            "• False positive reactions occur not infrequently and have been attributed to a variety of acute and chronic conditions. In absence of supporting clinical, historical or epidemiological evidence, reactive results must be confirmed with more specific Treponemal tests",
        },
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
        description: {
          type: String,
          default:
            "• D-dimer is a fibrin degradation product. Fibrins are fine threads of protein, which are produced when bleeding occurs as part of the coagulation process. The fibrins are cross-linked and form a net, which help to hold the clot in place. Once the wound has healed, the body starts to break down the clot by using a protein known as plasmin, the pieces of the disintegrating blood clot are known as the fibrin degradation products. D-dimer is not usually present in the bloodstream; it is only released into the blood when a blood clot is being broken down.",
        },
      },

      // ============= COAGULATION - BTCT (Bleeding Time & Clotting Time) - BTC001 =============
      btc001: {
        bleedingTime: { type: String, default: "" },
        clottingTime: { type: String, default: "" },
        description: {
          type: String,
          default:
            "• The person could be suffering from thrombocytopenia wherein the person bone marrow starts creating too little platelets in the body. • The person may be suffering from Von Willebrand's disease. This is an acquired hereditary disease that affects the process of blood coagulation in a person.",
        },
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
        description: {
          type: String,
          default:
            "• Electrolyte measurements may be used to help investigate conditions that cause electrolyte imbalances such as dehydration, kidney disease, lung diseases, or heart conditions. Repeat testing may then also be used to monitor treatment of the condition causing the imbalance. • An electrolyte panel may be ordered as part of a routine screening or as a diagnostic aid when a person has signs and symptoms, such as: • -Fluid accumulation (edema). • Nausea or vomiting • -Weakness • -confussion • -Irregular heart beat (cardiac arrhythmias) • It is frequently ordered as part of an evaluation when someone has an acute or chronic illness and at regular intervals when a person has a disease or condition or is taking a medication that can cause an electrolyte imbalance. Electrolyte tests are commonly ordered at regular intervals to monitor treatment of certain conditions, including high blood pressure (hypertension), heart failure, lung diseases, and liver and kidney disease",
        },
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
        description: {
          type: String,
          default:
            "• Rheumatoid factors are proteins produced by your immune system that can attack healthy tissue in your body. Healthy individuals normally do not produce rheumatoid factor, so its presence in your blood can indicate that you have an autoimmune disease.",
        },
      },

      // ============= IMMUNOLOGY - C. Reactive Protein (C.R.P.) - CRP001 =============
      crp001: {
        crp: { type: String, default: "" },
        description: {
          type: String,
          default:
            "• C-reactive protein (CRP) is an important and evolutionarily ancient component of the innate immune response. CRP has been described as the prototypical acute-phase reactant to infections and inflammation in human beings. In the clinical setting, CRP is used as a clinical indicator of acute infections and response to treatment, and to assess inflammatory status in chronic diseases. Initially it was thought that CRP might be a pathogenic secretion as it was elevated in people with a variety of illnesses including cancer. However, discovery of synthesis in the liver demonstrated that it is manufactured by the human body",
        },
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
        description: {
          type: String,
          default:
            "• FSH and LH values should be correlated with phase of cycle, high FSH and LH indicates ovarian failure or menopause, low FSH and LH indicates hypogonadism, LH/FSH ratio more than 2.0 indicates P.C.O.O. Prolcatin is stress hormone and many drugs affects prolactin result. Pooled serum is recommended to avoide false hyperprolactemia. • Testosterone is mojor adrogen responsible for sexna differentiation, and Male secondary sex Characteristics.it is coveried is blood by sex hormone binding globulin (SHBG). In Female it is important to diagnose hirtuism, hyperandrogenism for PCOD is useful to diagnose hypepituitarism, Kallamans syndrome",
        },
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
        description: {
          type: String,
          default:
            "• Triodothyronine (T3) is produced by the thyroid gland and along with thyroxine (T4) help control the rate at which the body uses energy. Elevated T3 denote hyperthyroidism while low levels indicate hypothyroidism. • The most common causes of thyroid dysfunction are related to autoimmune disorders. Graves disease causes hyperthyroidism, but it can also be caused by thyroiditis, thyroid cancer, and excessive production of TSH. Total T3 is used to assess thyroid function. •  Elevated T4 levels may indicate hyperthyroidism. They may also indicate other thyroid problems, such as thyroiditis or toxic multinodular goiter. Abnormally low levels of T4 may indicate: dietary issues, such as fasting, malnutrition, or an iodine deficiency, medications that affect protein levels, hypothyroidism, illness. • Thyroid-stimulating hormone (TSH) stimulates the production and release of T4 (primarily) and T3. They help control the rate at which the body uses energy and are regulated by a feedback system. Most of the T4 circulates in the blood bound to protein, while a small percentage is free (not bound). • Lab has estimated Total T4 reference intervals that are specific for India, using the indirect sampling technique following CLSI EP28-A3c document: Defining Establishing, and Verifying Reference Intervals in the Clinical Laboratory: Approved Guideline-Third Edition.",
        },
      },

      ////////////////////////////////////////////////
      // ============= Glucose Tolerance Test (GTT) - GTT001 =============
      gtt001: {
        glucoseToleranceTest: { type: String, default: "" },
        // Fasting Glucose Level or (BAsal)
        fglb: { type: String, default: "" },
        // Fasting Urine Glucose Level
        fugl: { type: String, default: "" },
        // Glucose 1.0 hr Post glucose load
        g1pgl: { type: String, default: "" },
        // Glucose Urine Level 1st Hour
        ugl1h: { type: String, default: "" },
        // Glucose 2.0 hr Post glucose load
        g2pgl: { type: String, default: "" },
        // Glucose Urine Level 2nd Hour
        ugl2h: { type: String, default: "" },
        // Glucose 3.0 hr Post glucose load
        g3pgl: { type: String, default: "" },
        // Glucose Urine Level 3rd Hour
        ugl3h: { type: String, default: "" },
        description: {
          type: String,
          default:
            "• At least two values must meet or exceed the stated reference value for a diagnosis of Gestational Diabetes mellitus (Fasting >95 mg/dL; 1 hour >180 mg/dL; 2 hours > 155 mg/dl; 3 hours 140 mg/dL). • If results are normal in clinically suspected cases, test must be repeated in the third trimester. Approximately 7% of all pregnancies develop glucose intolerance• ",
        },
      },
      // ============ Mantoux Test - MXT001 ============
      mxt001: {
        inDiameter: { type: String, default: "" },
        result: { type: String, default: "" }, // Positive or Negetive
      },
      // ============ Haemogram Report - HMG001 ============
      hmg001: {
        hemoglobin: { type: String, default: "" },
        totalRBC: { type: String, default: "" },
        totalWBC: { type: String, default: "" },
        lymphocytes: { type: String, default: "" },
        eosinophils: { type: String, default: "" },
        monocytes: { type: String, default: "" },
        basophils: { type: String, default: "" },
        polymorphs: { type: String, default: "" },
      },
      // ============ Erythrocyte Sedimentation Rate (ESR) - ESR001 ============
      esr001: {
        // Erythrocyte Sedimentation Rate : 1st hour
        esr1h: { type: String, default: "" },
        // ESR (Average)
        esrAvg: { type: String, default: "" },
      },
      // ============ Malaria Parasites - MPS001 ============
      mps001: {
        malariaPArasites: { type: String, default: "" }, // Negetive OR Positive
        method: { type: String, default: "" },
      },
      // ============ Pregnancy Test - PGT001 ============
      pgt001: {
        pregnancyTestSample: { type: String, default: "" }, // Morning || AfterNoon || Evening
        lmp: { type: String, default: "" },
        pregnancyTestResult: { type: String, default: "" },
        pregnancyIndi: { type: String, default: "" },
        pregnancySenstivity: { type: String, default: "" },
        method: { type: String, default: "Chromatographic Immunaassay" },
      },
      // ============ Urine Analysis - URA001 ============
      ura001: {
        // Physical Examination
        color: { type: String, default: "" },
        transparency: { type: String, default: "" },
        reaction: { type: String, default: "" },
        specificGravity: { type: String, default: "" },
        // Bio Chemical Examination
        protein: { type: String, default: "" },
        sugar: { type: String, default: "" },
        ketone: { type: String, default: "" },
        bilePigment: { type: String, default: "" },
        bileSalt: { type: String, default: "" },
        urobilinogen: { type: String, default: "" },
        // Microscopic Examination
        pusCells: { type: String, default: "" }, // Pus Cells (Leokocytes)
        rbc: { type: String, default: "" }, // RBC's (Erythrocytes)
        morphologyOfRBC: { type: String, default: "" },
        epithelialCells: { type: String, default: "" },
        crystals: { type: String, default: "" },
        casts: { type: String, default: "" },
        amorphousCrystals: { type: String, default: "" },
        backteriaFlora: { type: String, default: "" },
        note: { type: String, default: "" },
      },
      // ============ Lactic Acid Dehydrogenase (LDH) - LDH001 ============
      ldh001: {
        // Lactic Acid Dehydrogenase (LDH)
        ldh: { type: String, default: "" },
        method: { type: String, default: "Lactate to Pyrovate" },
        description1: {
          type: String,
          default:
            "• CDH is as a general indicator Of the existence and severity of acute or chronic tissue damage . This test helps identifying the and location of tissue damage in the body and to monitor its progress.",
        },
        description2: {
          type: String,
          default:
            "• Marked elevations in lactate dehydrogenase (IDH) activity can be observed in megaloblastic anemia, untreated pernicious anemia, Hodgkin's disease, abdominal and lung cancers, severe shock, and hypoxia.",
        },
        description3: {
          type: String,
          default:
            "• Moderate to slight increases in LDH levels are seen in myocardial infarction (MI), pulmonary infarction, pulmonary embolism, hemolytic anemia, infectious mononucleosis, progressive muscular dystrophy (especially in the early and middie stages of the disease), liver disease and renal disease",
        },
        description4: {
          type: String,
          default:
            "• LDH is most often measured to check for tissue damage. The enzyme LDH is in many body tissues, especially the heart, liver, kidney, skeleton muscle, brain. Other conditions under which the test may be done; Anemea of vitamin B-12 deficiency, Megaloblastic anemea, Pernicious anemea.",
        },
      },
      // ============ Randon Blood Sugar Level - RBS001 ============
      rbs001: {
        randomBloodSugar: { type: String, default: "" },
        method1: { type: String, default: "By GOD POD" },
        method2: {
          type: String,
          default: "Semi Automated Access/127 / Yucca Diagnostics",
        },
      },
      // ============ Fasting Blood Sugar Level - FBS001 ============
      fbs001: {
        fastingBloodSugar: { type: String, default: "" },
      },
      // ============ ChikunGunya - CKG001 ============
      ckg001: {
        result: { type: String, default: "" }, // Positive or Negetive
      },
      // ============ Bilirubin - BRB001 ============
      brb001: {
        bilirubinTotal: { type: String, default: "" },
        serumMethod1: { type: String, default: "By Modified Tab Method" },
        bilirubinDirect: { type: String, default: "" },
        serumMethod2: { type: String, default: "Diazotization" },
        bilirubinIndirect: { type: String, default: "" },
        serumMethod3: { type: String, default: "Calulated" },
      },
      // ============== Seminal Fluid Report - SFR001 =============
      sfr001: {
        methodOfCollection: { type: String, default: "" },
        periodOfAbstinence: { type: String, default: "" },
        timeOfCollection: { type: String, default: "" },
        timeOfExamination: { type: String, default: "" },
        quantity: { type: String, default: "" },
        color: { type: String, default: "" },
        viscosity: { type: String, default: "" },
        liquificationTIme: { type: String, default: "" },
        reaction: { type: String, default: "" },
        fructoseTest: { type: String, default: "" },
        totalSpermCount: { type: String, default: "" },
        // Motility-Immediate (Actively Motile)
        motilityImmediate: { type: String, default: "" },
        slugishlyMotil: { type: String, default: "" },
        nonMotile: { type: String, default: "" },
        motility: { type: String, default: "" }, // Motility - After 2 hrs (Actively Motile)
        abnormalFormsHead: { type: String, default: "" },
        body: { type: String, default: "" },
        tails: { type: String, default: "" },
        immatureForms: { type: String, default: "" },
        pusCells: { type: String, default: "" },
        redCells: { type: String, default: "" },
        epithelialCell: { type: String, default: "" },
        autoAgglutination: { type: String, default: "" },
        gramsStain: { type: String, default: "" },
        totalSperCountAfterWash: { type: String, default: "" },
        Impression: { type: String, default: "" },
      },
      // ============ Serum Amylase - SML001 ==============
      sml001: {
        serumAmylase: { type: String, default: "" },
        method: { type: String, default: "Enzymatic" },
        description: {
          type: String,
          default:
            "• In acute pancreatitis, a transient rise in serum amylase activity occurs within 2 to 12 hours of onset; levels return to normal by the third or fourth day. A 3- to 6-fold elevation of amylase activity above the reference limit is usual, with maximal levels reached in 12 to 72 hours. A significant number of patients may show lesser elevations or none at all. The degree of elevation in serum enzyme activity does not correlate with the severity of pancreatic damage. Normalization does not necessarily indicate resolution. In cases associated with hyperlipidemia, serum amylase activity may appear spuriously normal; the amylasemia may be unmasked either by serial dilution of the serum or by ultracentrifugation. • A portion of serum amylase is excreted in the urine, and thus, elevation of serum activity is reflected in urinary activity. Urinary amylase, compared to serum amylase, is often more frequently elevated, reaches higher levels, and persists longer. However, receiver operating characteristic (ROC) curves of various serum and urine amylase assays show that all urine assays have poorer diagnostic utility than serum assays. In quiescent chronic pancreatitis, both serum and urine activities are usually normal. • Because it is produced by several organs, amylase is not a specific marker of pancreatic function. Elevated levels may result from non-pancreatic conditions including mumps, salivary gland obstruction, ectopic pregnancy, and intestinal diseases. ",
        },
      },
      // ============ Serum Lipase - SLP001  ============
      slp001: {
        serumLipase: { type: String, default: "" },
        method: { type: String, default: "Enzymatic" },
        description: {
          type: String,
          default:
            "• Lipase levels are increased in chronic pancreatitis and pancreatic duct obstruction. • Pancreatic duct obstruction due to fibrous strictures, stones, tumors, or edema elevates secretory pressure and leads to extravasation of lipase into the pericapillary spaces. • Lipase is not specific to pancreatic disease and may be elevated in renal disease, acute cholecystitis, bowel obstruction, intestinal infarction, duodenal ulcers, liver disease, alcoholism, diabetic ketoacidosis, and following endoscopic retrograde cholangiopancreatography (ERCP). • Patients with renal failure may exhibit lipase levels up to three times the upper limit of normal. • Lipase levels may be decreased due to methodological interferences (e.g., presence of hemoglobin, quinine, heavy metals, calcium ions). Lipase remains normal in individuals with mumps and macroamylasemia. Values are also lower in neonates.",
        },
      },
      // ============= Sputum AFB - SFB001 ============
      sfb001: {
        sputumForAFB_Stain: { type: String, default: "" },
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
