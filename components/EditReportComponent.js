"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

// Test parameters mapping synchronized with ReportPDF.js
const TEST_PARAMETERS = {
  CBC001: [
    { key: "hemoglobin", parameter: "Haemoglobin", unit: "g/dL", referenceRange: "13-18", type: "number" },
    { key: "totalRBC", parameter: "Total R.B.C.", unit: "mil/cumm", referenceRange: "4.5-6.2", type: "number" },
    { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-11000", type: "number" },
    { key: "separator", parameter: "DIFFERENTIAL COUNT", unit: "", referenceRange: "" },
    { key: "polymorphs", parameter: "Polymorphs", unit: "%", referenceRange: "40-75", type: "number" },
    { key: "lymphocytes", parameter: "Lymphocytes", unit: "%", referenceRange: "20-45", type: "number" },
    { key: "eosinophils", parameter: "Eosinophils", unit: "%", referenceRange: "1-6", type: "number" },
    { key: "monocytes", parameter: "Monocytes", unit: "%", referenceRange: "2-10", type: "number" },
    { key: "basophils", parameter: "Basophils", unit: "%", referenceRange: "0-1", type: "number" },
    { key: "plateletCount", parameter: "Platelet Count", unit: "Lakhs/cmm", referenceRange: "1.5-4.5", type: "number" },
    { key: "hct", parameter: "H.C.T.", unit: "%", referenceRange: "36-46", type: "number" },
    { key: "mcv", parameter: "M.C.V.", unit: "fL", referenceRange: "76-96", type: "number" },
    { key: "mch", parameter: "M.C.H.", unit: "pg", referenceRange: "27-32", type: "number" },
    { key: "mchc", parameter: "M.C.H.C.", unit: "g/dL", referenceRange: "32-36", type: "number" },
    { key: "rdw", parameter: "R.D.W.", unit: "%", referenceRange: "11.5-14.5", type: "number" },
    { key: "mpv", parameter: "M.P.V.", unit: "fL", referenceRange: "7.4-10.4", type: "number" },
  ],
  WID001: [
    { key: "salmonellaO", parameter: "Salmonella Typhi - O", unit: "", referenceRange: "<1:80", type: "text" },
    { key: "salmonellaH", parameter: "Salmonella Typhi - H", unit: "", referenceRange: "<1:80", type: "text" },
    { key: "widalConclusion", parameter: "Widal Conclusion", unit: "", referenceRange: "", type: "text" },
  ],
  BCM001: [
    { key: "separator", parameter: "LIVER FUNCTION TESTS", unit: "", referenceRange: "" },
    { key: "totalBilirubin", parameter: "Total Bilirubin", unit: "mg/dL", referenceRange: "0.2-1.0", type: "number" },
    { key: "directBilirubin", parameter: "Direct Bilirubin", unit: "mg/dL", referenceRange: "0-0.4", type: "number" },
    { key: "indirectBilirubin", parameter: "Indirect Bilirubin", unit: "mg/dL", referenceRange: "0-0.5", type: "number" },
    { key: "alkalinePhosphatase", parameter: "S. Alkaline Phosphatase", unit: "U/L", referenceRange: "60-170", type: "number" },
    { key: "sgpt", parameter: "Alanine Transaminase (ALT/SGPT)", unit: "U/L", referenceRange: "5-50", type: "number" },
    { key: "sgot", parameter: "Aspartate Transaminase (AST/SGOT)", unit: "U/L", referenceRange: "5-50", type: "number" },
    { key: "totalProtein", parameter: "Total Protein", unit: "g/dL", referenceRange: "6-8", type: "number" },
    { key: "albumin", parameter: "Albumin", unit: "g/dL", referenceRange: "3.5-4.5", type: "number" },
    { key: "globulin", parameter: "Globulin", unit: "g/dL", referenceRange: "2.5-3.5", type: "number" },
    { key: "agRatio", parameter: "A/G Ratio", unit: "mgm%", referenceRange: "1.3-4.0", type: "number" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  TDR001: [
    { key: "styphiIgG", parameter: "S. Typhi IgG", unit: "", referenceRange: "", type: "text" },
    { key: "styphiIgM", parameter: "S. Typhi IgM", unit: "", referenceRange: "", type: "text" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Chromatographic Immunoassay", type: "text" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  VDR001: [
    { key: "vdrlResult", parameter: "VDRL Result", unit: "", referenceRange: "", type: "text" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  RFT001: [
    { key: "bloodUrea", parameter: "Blood Urea", unit: "mg/dL", referenceRange: "10-45", type: "number" },
    { key: "bun", parameter: "Blood Urea Nitrogen", unit: "mg/dL", referenceRange: "3.3-18.7", type: "number" },
    { key: "sCreatinine", parameter: "Serum Creatinine", unit: "mg/dL", referenceRange: "0.6-1.4", type: "number" },
    { key: "serumUricAcid", parameter: "Serum Uric Acid", unit: "mg/dL", referenceRange: "2-8", type: "number" },
    { key: "totalProtein", parameter: "Total Protein", unit: "g/dL", referenceRange: "6-8", type: "number" },
    { key: "sAlbumin", parameter: "Serum Albumin", unit: "g/dL", referenceRange: "3.5-4.5", type: "number" },
    { key: "sGlobulin", parameter: "Serum Globulin", unit: "g/dL", referenceRange: "2.5-3.5", type: "number" },
    { key: "agRatio", parameter: "A/G Ratio", unit: "mgm%", referenceRange: "1.3-4.0", type: "number" },
  ],
  URI001: [
    { key: "serumUricAcid", parameter: "Serum Uric Acid", unit: "mg/dL", referenceRange: "2.0-7.0", type: "number" },
  ],
  SCR001: [
    { key: "sCreatinine", parameter: "Serum Creatinine", unit: "mg/dL", referenceRange: "0.8-1.4", type: "number" },
  ],
  LIP001: [
    { key: "serumTotalCholesterol", parameter: "Serum Total Cholesterol", unit: "mg/dL", referenceRange: "100-200", type: "number" },
    { key: "serumTriglyceride", parameter: "Serum Triglycerides", unit: "mg/dL", referenceRange: "65-150", type: "number" },
    { key: "hdlCholesterol", parameter: "HDL Cholesterol", unit: "mg/dL", referenceRange: "30-60", type: "number" },
    { key: "sLDLCholesterol", parameter: "LDL Cholesterol", unit: "mg/dL", referenceRange: "0-100", type: "number" },
    { key: "sVLDLCholesterol", parameter: "VLDL Cholesterol", unit: "mg/dL", referenceRange: "6-40", type: "number" },
    { key: "nonHDLCholesterol", parameter: "Non-HDL Cholesterol", unit: "mg/dL", referenceRange: "0-130", type: "number" },
    { key: "cholesterolHDLRatio", parameter: "Cholesterol/HDL Ratio", unit: "", referenceRange: "0-5.0", type: "number" },
    { key: "ldlHDLRatio", parameter: "LDL/HDL Ratio", unit: "", referenceRange: "0-3.5", type: "number" },
  ],
  ANT001: [
    { key: "hemoglobin", parameter: "Haemoglobin", unit: "mg/dL", referenceRange: "14-17", type: "number" },
    { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-10000", type: "number" },
    { key: "bgRh", parameter: "Blood Group & Rh Typing", unit: "", referenceRange: "", type: "text" },
    { key: "rbc", parameter: "R.B.C.", unit: "mil/cumm", referenceRange: "4.0-5.2", type: "number" },
    { key: "rbs", parameter: "Random Blood Sugar", unit: "mg/dL", referenceRange: "70-140", type: "number" },
    { key: "vdrl", parameter: "VDRL", unit: "", referenceRange: "Non-reactive", type: "text" },
    { key: "plateletCount", parameter: "Platelet Count", unit: "Lakhs/cmm", referenceRange: "1.5-4.5", type: "number" },
    { key: "hiv", parameter: "HIV", unit: "", referenceRange: "Non-Reactive", type: "text" },
    { key: "hbsag", parameter: "HBsAg", unit: "", referenceRange: "Non-Reactive", type: "text" },
  ],
  DDI001: [
    { key: "dDimer", parameter: "D-Dimer", unit: "ng/mL", referenceRange: "0-500", type: "number" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  BTC001: [
    { key: "bleedingTime", parameter: "Bleeding Time", unit: "", referenceRange: "2-7 min", type: "text" },
    { key: "clottingTime", parameter: "Clotting Time", unit: "", referenceRange: "4-11 min", type: "text" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  RAA001: [
    { key: "rfa", parameter: "Rheumatoid Factor Assay", unit: "IU/mL", referenceRange: "0-20", type: "number" },
    { key: "asoTest", parameter: "ASO Test", unit: "IU/mL", referenceRange: "0-200", type: "number" },
    { key: "crpTest", parameter: "CRP Test", unit: "mg/L", referenceRange: "upto 6.0", type: "number" },
  ],
  SGT001: [
    { key: "sgot", parameter: "SGOT (AST)", unit: "U/L", referenceRange: "6-38", type: "number" },
  ],
  COA001: [
    { key: "coagBleedingTimeMin", parameter: "Bleeding Time (Min)", unit: "min", referenceRange: "3-10", type: "number" },
    { key: "coagBleedingTimeSec", parameter: "Bleeding Time (Sec)", unit: "sec", referenceRange: "", type: "number" },
    { key: "coagClottingTimeMin", parameter: "Clotting Time (Min)", unit: "min", referenceRange: "2-7", type: "number" },
    { key: "coagClottingTimeSec", parameter: "Clotting Time (Sec)", unit: "sec", referenceRange: "", type: "number" },
    { key: "coagClotRetraction", parameter: "Clot Retraction", unit: "", referenceRange: "", type: "text" },
    { key: "hemoPlateletCount", parameter: "Platelet Count", unit: "Lakhs/cmm", type: "number" },
    { key: "coagProthrombinTimeControl", parameter: "Prothrombin Time (Control)", unit: "sec", referenceRange: "10.3-12.8", type: "number" },
    { key: "coagProthrombinTimePatient", parameter: "Prothrombin Time (Patient)", unit: "sec", referenceRange: "10-14", type: "number" },
    { key: "coagINR", parameter: "INR", unit: "", referenceRange: "0.8-1.2", type: "number" },
    { key: "coagISI", parameter: "ISI", unit: "", referenceRange: "", type: "text" },
    { key: "coagProthrombinIndex", parameter: "Prothrombin Index", unit: "", referenceRange: "", type: "text" },
    { key: "coagProthrombinRatio", parameter: "Prothrombin Ratio", unit: "", referenceRange: "", type: "text" },
    { key: "coagAPTTTest", parameter: "APTT (Test)", unit: "sec", referenceRange: "25-37", type: "number" },
    { key: "coagAPTTControl", parameter: "APTT (Control)", unit: "sec", referenceRange: "25-35", type: "number" },
    { key: "coagFDP", parameter: "FDP", unit: "µg/mL", referenceRange: "0-5.0", type: "number" },
    { key: "coagFactorXIIIScreening", parameter: "Factor XIII Screening", unit: "", referenceRange: "", type: "text" },
    { key: "coagThrombinTime", parameter: "Thrombin Time", unit: "", referenceRange: "", type: "text" },
    { key: "plasmaRecalcificationTime", parameter: "Plasma Recalcification Time", unit: "sec", referenceRange: "", type: "number" },
    { key: "factorVIIIAssay", parameter: "Factor VIII Assay", unit: "%", referenceRange: "", type: "number" },
    { key: "dDimer", parameter: "D-Dimer", unit: "mg/L", referenceRange: "", type: "number" },
    { key: "plasmaFibrinogen", parameter: "Plasma Fibrinogen", unit: "mg/dL", referenceRange: "200-400", type: "number" },
    { key: "coagNote", parameter: "Note", unit: "", referenceRange: "", type: "textarea" },
  ],
  AEC001: [
    { key: "totalEAC", parameter: "Absolute Eosinophil Count", unit: "/cumm", referenceRange: "40-440", type: "number" },
  ],
  SER001: [
    { key: "sodium", parameter: "Sodium", unit: "mEq/L", referenceRange: "135-145", type: "number" },
    { key: "potassium", parameter: "Potassium", unit: "mEq/L", referenceRange: "3.5-5.4", type: "number" },
    { key: "chlorides", parameter: "Chlorides", unit: "mEq/L", referenceRange: "96-106", type: "number" },
    { key: "calcium", parameter: "Calcium", unit: "", referenceRange: "", type: "number" },
    { key: "elecInorganicPhosphorous", parameter: "Inorganic Phosphorus", unit: "", referenceRange: "", type: "number" },
    { key: "elecLithium", parameter: "Lithium", unit: "mEq/L", referenceRange: "", type: "number" },
    { key: "splBicarbonate", parameter: "Bicarbonate", unit: "mEq/L", referenceRange: "", type: "number" },
    { key: "elecMagnesium", parameter: "Magnesium", unit: "mg/dL", referenceRange: "", type: "number" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "ION Selected Electrodes (ISE) Direct", type: "text" },
    { key: "instrumentUsed", parameter: "Instrument Used", unit: "", referenceRange: "YUCCA SENSA CORE Electrolyte Analyzer", type: "text" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  TPT001: [
    { key: "troponin", parameter: "Troponin-T", unit: "", referenceRange: "Negative", type: "text" },
  ],
  BLG001: [
    { key: "aboGroupingSystem", parameter: "ABO Grouping", unit: "", referenceRange: "", type: "text" },
    { key: "rhoTyping", parameter: "Rh Typing", unit: "", referenceRange: "Positive/Negative", type: "text" },
  ],
  MPM001: [
    { key: "malariaParasites", parameter: "Malaria Parasites", unit: "", referenceRange: "Positive/Negative", type: "text" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Microscopic Examination", type: "text" },
  ],
  RAF001: [
    { key: "rheumatoidFactorAssay", parameter: "Rheumatoid Factor Assay", unit: "IU/mL", referenceRange: "0-20", type: "number" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  CRP001: [
    { key: "crp", parameter: "C-Reactive Protein", unit: "", referenceRange: "0-10", type: "number" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  ANT002: [
    { key: "igg", parameter: "Scrub Typhus IgG", unit: "", referenceRange: "Negative/Positive", type: "text" },
    { key: "igm", parameter: "Scrub Typhus IgM", unit: "", referenceRange: "Negative/Positive", type: "text" },
  ],
  HBA001: [
    { key: "glycatedHemoglobin", parameter: "HbA1c", unit: "%", referenceRange: "", type: "number" },
    { key: "estimatedAverageGlucose", parameter: "Estimated Average Glucose", unit: "mg/dL", referenceRange: "", type: "number" },
  ],
  BET001: [
    { key: "betaHCG", parameter: "Beta HCG", unit: "mIU/mL", referenceRange: "0-5 (Non-pregnant)", type: "number" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  HIV001: [
    { key: "hivIII", parameter: "HIV I-II", unit: "", referenceRange: "Non-reactive", type: "text" },
  ],
  HBS001: [
    { key: "hepatitisBSurfaceAntigen", parameter: "HBsAg", unit: "", referenceRange: "Negative/Positive", type: "text" },
    { key: "doneBy", parameter: "Method", unit: "", referenceRange: "Rapid Card Method", type: "text" },
  ],
  ANT003: [
    { key: "hepatitisCSurfaceAntigen", parameter: "Anti-HCV", unit: "", referenceRange: "Non-reactive", type: "text" },
  ],
  TFT001: [
    { key: "totalT3", parameter: "Total T3", unit: "ng/dL", referenceRange: "60-200", type: "number" },
    { key: "totalT4", parameter: "Total T4", unit: "µg/dL", referenceRange: "4.5-14.5", type: "number" },
    { key: "tsh", parameter: "TSH", unit: "µIU/mL", referenceRange: "0.35-5.5", type: "number" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  MCP001: [
    { key: "urineColor", parameter: "Color", unit: "", referenceRange: "Pale Yellow", type: "text" },
    { key: "urineAppearance", parameter: "Appearance", unit: "", referenceRange: "Clear", type: "text" },
    { key: "pusCells", parameter: "Pus Cells", unit: "/hpf", referenceRange: "0-5", type: "number" },
    { key: "urineRBC", parameter: "Red Blood Cells", unit: "/hpf", referenceRange: "0-2", type: "number" },
    { key: "epithelialCells", parameter: "Epithelial Cells", unit: "/hpf", referenceRange: "Few", type: "text" },
    { key: "casts", parameter: "Casts", unit: "", referenceRange: "Nil", type: "text" },
    { key: "crystals", parameter: "Crystals", unit: "", referenceRange: "Nil", type: "text" },
    { key: "bacteria", parameter: "Bacteria", unit: "", referenceRange: "Nil", type: "text" },
    { key: "ova", parameter: "Ova", unit: "", referenceRange: "Not Seen", type: "text" },
    { key: "cysts", parameter: "Cysts", unit: "", referenceRange: "Not Seen", type: "text" },
    { key: "mucus", parameter: "Mucus", unit: "", referenceRange: "Nil", type: "text" },
    { key: "occultBlood", parameter: "Occult Blood", unit: "", referenceRange: "Negative", type: "text" },
  ],
  GTT001: [
    { key: "glucoseToleranceTest", parameter: "Glucose Tolerance Test", unit: "", referenceRange: "", type: "text" },
    { key: "fglb", parameter: "Fasting Glucose Level (Basal)", unit: "mg/dL", referenceRange: "70-100", type: "number" },
    { key: "fugl", parameter: "Fasting Urine Glucose Level", unit: "", referenceRange: "Negative", type: "text" },
    { key: "g1pgl", parameter: "Glucose 1.0 hr Post Glucose Load", unit: "mg/dL", referenceRange: "<140", type: "number" },
    { key: "ugl1h", parameter: "Glucose Urine Level 1st Hour", unit: "", referenceRange: "Negative", type: "text" },
    { key: "g2pgl", parameter: "Glucose 2.0 hr Post Glucose Load", unit: "mg/dL", referenceRange: "<140", type: "number" },
    { key: "ugl2h", parameter: "Glucose Urine Level 2nd Hour", unit: "", referenceRange: "Negative", type: "text" },
    { key: "g3pgl", parameter: "Glucose 3.0 hr Post Glucose Load", unit: "mg/dL", referenceRange: "<140", type: "number" },
    { key: "ugl3h", parameter: "Glucose Urine Level 3rd Hour", unit: "", referenceRange: "Negative", type: "text" },
    { key: "description1", parameter: "Description 1", unit: "", referenceRange: "", type: "textarea" },
    { key: "description2", parameter: "Description 2", unit: "", referenceRange: "", type: "textarea" },
  ],
  MXT001: [
    { key: "inDiameter", parameter: "Induration Diameter", unit: "mm", referenceRange: "", type: "number" },
    { key: "result", parameter: "Result", unit: "", referenceRange: "Positive/Negative", type: "dropdown", options: ["Positive", "Negative"] },
  ],
  HMG001: [
    { key: "hemoglobin", parameter: "Hemoglobin", unit: "g/dL", referenceRange: "13-18", type: "number" },
    { key: "totalRBC", parameter: "Total R.B.C.", unit: "mil/cumm", referenceRange: "4.5-6.2", type: "number" },
    { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-11000", type: "number" },
    { key: "lymphocytes", parameter: "Lymphocytes", unit: "%", referenceRange: "20-45", type: "number" },
    { key: "eosinophils", parameter: "Eosinophils", unit: "%", referenceRange: "1-6", type: "number" },
    { key: "monocytes", parameter: "Monocytes", unit: "%", referenceRange: "2-10", type: "number" },
    { key: "basophils", parameter: "Basophils", unit: "%", referenceRange: "0-1", type: "number" },
    { key: "polymorphs", parameter: "Polymorphs", unit: "%", referenceRange: "40-75", type: "number" },
  ],
  ESR001: [
    { key: "esr1h", parameter: "ESR (1st Hour)", unit: "mm/hr", referenceRange: "0-20", type: "number" },
    { key: "esrAvg", parameter: "ESR (Average)", unit: "mm/hr", referenceRange: "0-20", type: "number" },
  ],
  MPS001: [
    { key: "malariaPArasites", parameter: "Malaria Parasites", unit: "", referenceRange: "Positive/Negative", type: "dropdown", options: ["Positive", "Negative"] },
    { key: "method", parameter: "Method", unit: "", referenceRange: "", type: "text" },
  ],
  PGT001: [
    { key: "pregnancyTestSample", parameter: "Sample Time", unit: "", referenceRange: "", type: "dropdown", options: ["Morning", "Afternoon", "Evening"] },
    { key: "lmp", parameter: "Last Menstrual Period (LMP)", unit: "", referenceRange: "", type: "text" },
    { key: "pregnancyTestResult", parameter: "Pregnancy Test Result", unit: "", referenceRange: "Positive/Negative", type: "dropdown", options: ["Positive", "Negative"] },
    { key: "pregnancyIndi", parameter: "Indication", unit: "", referenceRange: "", type: "text" },
    { key: "pregnancySenstivity", parameter: "Sensitivity", unit: "", referenceRange: "", type: "text" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Chromatographic Immunoassay", type: "text" },
  ],
  URA001: [
    { key: "separator", parameter: "PHYSICAL EXAMINATION", unit: "", referenceRange: "" },
    { key: "color", parameter: "Color", unit: "", referenceRange: "Pale Yellow", type: "text" },
    { key: "transparency", parameter: "Transparency", unit: "", referenceRange: "Clear", type: "text" },
    { key: "reaction", parameter: "Reaction", unit: "", referenceRange: "Acidic", type: "text" },
    { key: "specificGravity", parameter: "Specific Gravity", unit: "", referenceRange: "1010-1030", type: "number" },
    { key: "separator", parameter: "BIOCHEMICAL EXAMINATION", unit: "", referenceRange: "" },
    { key: "protein", parameter: "Protein", unit: "", referenceRange: "Negative", type: "text" },
    { key: "sugar", parameter: "Sugar", unit: "", referenceRange: "Negative", type: "text" },
    { key: "ketone", parameter: "Ketone", unit: "", referenceRange: "Negative", type: "text" },
    { key: "bilePigment", parameter: "Bile Pigment", unit: "", referenceRange: "Negative", type: "text" },
    { key: "bileSalt", parameter: "Bile Salt", unit: "", referenceRange: "Negative", type: "text" },
    { key: "urobilinogen", parameter: "Urobilinogen", unit: "", referenceRange: "Normal", type: "text" },
    { key: "separator", parameter: "MICROSCOPIC EXAMINATION", unit: "", referenceRange: "" },
    { key: "pusCells", parameter: "Pus Cells", unit: "/hpf", referenceRange: "0-5", type: "number" },
    { key: "rbc", parameter: "RBCs", unit: "/hpf", referenceRange: "0-2", type: "number" },
    { key: "morphologyOfRBC", parameter: "Morphology of RBC", unit: "", referenceRange: "", type: "text" },
    { key: "epithelialCells", parameter: "Epithelial Cells", unit: "/hpf", referenceRange: "Few", type: "text" },
    { key: "crystals", parameter: "Crystals", unit: "", referenceRange: "Nil", type: "text" },
    { key: "casts", parameter: "Casts", unit: "", referenceRange: "Nil", type: "text" },
    { key: "amorphousCrystals", parameter: "Amorphous Crystals", unit: "", referenceRange: "Nil", type: "text" },
    { key: "backteriaFlora", parameter: "Bacterial Flora", unit: "", referenceRange: "Nil", type: "text" },
    { key: "note", parameter: "Note", unit: "", referenceRange: "", type: "textarea" },
  ],
  LDH001: [
    { key: "ldh", parameter: "Lactic Acid Dehydrogenase (LDH)", unit: "U/L", referenceRange: "140-280", type: "number" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Lactate to Pyruvate", type: "text" },
    { key: "description1", parameter: "Description 1", unit: "", referenceRange: "", type: "textarea" },
    { key: "description2", parameter: "Description 2", unit: "", referenceRange: "", type: "textarea" },
    { key: "description3", parameter: "Description 3", unit: "", referenceRange: "", type: "textarea" },
    { key: "description4", parameter: "Description 4", unit: "", referenceRange: "", type: "textarea" },
  ],
  RBS001: [
    { key: "randomBloodSugar", parameter: "Random Blood Sugar", unit: "mg/dL", referenceRange: "70-140", type: "number" },
    { key: "method1", parameter: "Method 1", unit: "", referenceRange: "By GOD POD", type: "text" },
    { key: "method2", parameter: "Method 2", unit: "", referenceRange: "Semi Automated Access/127 / Yucca Diagnostics", type: "text" },
  ],
  FBS001: [
    { key: "fastingBloodSugar", parameter: "Fasting Blood Sugar", unit: "mg/dL", referenceRange: "70-100", type: "number" },
  ],
  CKG001: [
    { key: "result", parameter: "Result", unit: "", referenceRange: "Positive/Negative", type: "dropdown", options: ["Positive", "Negative"] },
  ],
  BRB001: [
    { key: "bilirubinTotal", parameter: "Bilirubin Total", unit: "mg/dL", referenceRange: "0.2-1.0", type: "number" },
    { key: "serumMethod1", parameter: "Method 1", unit: "", referenceRange: "By Modified Tab Method", type: "text" },
    { key: "bilirubinDirect", parameter: "Bilirubin Direct", unit: "mg/dL", referenceRange: "0-0.4", type: "number" },
    { key: "serumMethod2", parameter: "Method 2", unit: "", referenceRange: "Diazotization", type: "text" },
    { key: "bilirubinIndirect", parameter: "Bilirubin Indirect", unit: "mg/dL", referenceRange: "0-0.5", type: "number" },
    { key: "serumMethod3", parameter: "Method 3", unit: "", referenceRange: "Calculated", type: "text" },
  ],
  SFR001: [
    { key: "methodOfCollection", parameter: "Method of Collection", unit: "", referenceRange: "", type: "text" },
    { key: "periodOfAbstinence", parameter: "Period of Abstinence", unit: "days", referenceRange: "", type: "number" },
    { key: "timeOfCollection", parameter: "Time of Collection", unit: "", referenceRange: "", type: "text" },
    { key: "timeOfExamination", parameter: "Time of Examination", unit: "", referenceRange: "", type: "text" },
    { key: "quantity", parameter: "Quantity", unit: "mL", referenceRange: "1.5-5.0", type: "number" },
    { key: "color", parameter: "Color", unit: "", referenceRange: "Greyish White", type: "text" },
    { key: "viscosity", parameter: "Viscosity", unit: "", referenceRange: "", type: "text" },
    { key: "liquificationTIme", parameter: "Liquefaction Time", unit: "min", referenceRange: "15-60", type: "number" },
    { key: "reaction", parameter: "Reaction", unit: "", referenceRange: "Alkaline", type: "text" },
    { key: "fructoseTest", parameter: "Fructose Test", unit: "", referenceRange: "Positive", type: "text" },
    { key: "totalSpermCount", parameter: "Total Sperm Count", unit: "million/mL", referenceRange: "15-200", type: "number" },
    { key: "motilityImmediate", parameter: "Motility Immediate (Actively Motile)", unit: "%", referenceRange: ">40", type: "number" },
    { key: "slugishlyMotil", parameter: "Sluggishly Motile", unit: "%", referenceRange: "", type: "number" },
    { key: "nonMotile", parameter: "Non-Motile", unit: "%", referenceRange: "", type: "number" },
    { key: "motility", parameter: "Motility After 2 hrs (Actively Motile)", unit: "%", referenceRange: ">40", type: "number" },
    { key: "abnormalFormsHead", parameter: "Abnormal Forms (Head)", unit: "%", referenceRange: "", type: "number" },
    { key: "body", parameter: "Abnormal Forms (Body)", unit: "%", referenceRange: "", type: "number" },
    { key: "tails", parameter: "Abnormal Forms (Tails)", unit: "%", referenceRange: "", type: "number" },
    { key: "immatureForms", parameter: "Immature Forms", unit: "%", referenceRange: "", type: "number" },
    { key: "pusCells", parameter: "Pus Cells", unit: "/hpf", referenceRange: "0-5", type: "number" },
    { key: "redCells", parameter: "Red Cells", unit: "/hpf", referenceRange: "0-2", type: "number" },
    { key: "epithelialCell", parameter: "Epithelial Cells", unit: "/hpf", referenceRange: "Few", type: "text" },
    { key: "autoAgglutination", parameter: "Auto Agglutination", unit: "", referenceRange: "Absent", type: "text" },
    { key: "gramsStain", parameter: "Gram's Stain", unit: "", referenceRange: "", type: "text" },
    { key: "totalSperCountAfterWash", parameter: "Total Sperm Count After Wash", unit: "million/mL", referenceRange: "", type: "number" },
    { key: "Impression", parameter: "Impression", unit: "", referenceRange: "", type: "textarea" },
  ],
  SML001: [
    { key: "serumAmylase", parameter: "Serum Amylase", unit: "U/L", referenceRange: "30-110", type: "number" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Enzymatic", type: "text" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  SLP001: [
    { key: "serumLipase", parameter: "Serum Lipase", unit: "U/L", referenceRange: "10-140", type: "number" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Enzymatic", type: "text" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "", type: "textarea" },
  ],
  SFB001: [
    { key: "sputumForAFB_Stain", parameter: "Sputum for AFB Stain", unit: "", referenceRange: "Negative", type: "text" },
  ],
};

const EditReportComponent = () => {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ testResults: {}, date: "" });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/editreport/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setReport(data.report);
          initializeFormData(data.report);
        } else {
          setError(data.message || "Failed to fetch report");
        }
      } catch (err) {
        setError("Failed to fetch report");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

  const initializeFormData = (reportData) => {
    const initialData = {
      patientName: reportData.patientName || "",
      mobile: reportData.mobile || "",
      age: reportData.age || "",
      gender: reportData.gender || "",
      collectedBy: reportData.collectedBy || "",
      refBy: reportData.refBy || "",
      address: reportData.address || "",
      date: reportData.date ? new Date(reportData.date).toISOString().split("T")[0] : "", // Format date for input
      tests: reportData.tests || [],
      testResults: Object.keys(TEST_PARAMETERS).reduce((acc, testCode) => ({
        ...acc,
        [testCode.toLowerCase()]: reportData.testResults?.[testCode.toLowerCase()] || {},
      }), {}),
    };
    setFormData(initialData);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.patientName || formData.patientName.length < 2) {
      errors.patientName = "Patient name must be at least 2 characters long";
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      errors.mobile = "Mobile number must be at least 10 characters long";
    }
    if (!formData.age || formData.age < 1) {
      errors.age = "Age must be at least 1";
    }
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }
    if (formData.collectedBy && formData.collectedBy.length < 2) {
      errors.collectedBy = "Collected by must be at least 2 characters long";
    }
    if (formData.refBy && formData.refBy.length < 2) {
      errors.refBy = "Referred by must be at least 2 characters long";
    }
    if (formData.address && formData.address.length < 5) {
      errors.address = "Address must be at least 5 characters long";
    }
    if (!formData.date) {
      errors.date = "Date is required";
    }
    if (formData.tests) {
      formData.tests.forEach((test, index) => {
        if (!test.testName || test.testName.length < 2) {
          errors[`testName_${index}`] = `Test name for test ${index + 1} must be at least 2 characters long`;
        }
        if (!test.testCode || test.testCode.length < 2) {
          errors[`testCode_${index}`] = `Test code for test ${index + 1} must be at least 2 characters long`;
        }
        if (test.price < 0) {
          errors[`price_${index}`] = `Price for test ${index + 1} cannot be negative`;
        }
        // Validate test result fields
        const parameters = TEST_PARAMETERS[test.testCode];
        if (parameters) {
          parameters.forEach((param) => {
            const value = formData.testResults[test.testCode.toLowerCase()]?.[param.key];
            if (param.type === "number" && value && isNaN(parseFloat(value))) {
              errors[`${test.testCode}_${param.key}`] = `${param.parameter} must be a valid number`;
            }
          });
        }
      });
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBasicInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "age" ? parseInt(value) || "" : value,
    }));
    setValidationErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleTestChange = (testIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      tests: prev.tests.map((test, index) =>
        index === testIndex
          ? {
              ...test,
              [field]: field === "price" ? parseFloat(value) || 0 : value,
            }
          : test
      ),
    }));
    setValidationErrors((prev) => ({
      ...prev,
      [`${field}_${testIndex}`]: null,
    }));
  };

  const handleTestResultChange = (testCode, field, value) => {
    setFormData((prev) => ({
      ...prev,
      testResults: {
        ...prev.testResults,
        [testCode.toLowerCase()]: {
          ...prev.testResults[testCode.toLowerCase()],
          [field]: value,
        },
      },
    }));
    setValidationErrors((prev) => ({
      ...prev,
      [`${testCode}_${field}`]: null,
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please correct the validation errors before saving.");
      return;
    }

    try {
      setSaving(true);
      const totalPrice = formData.tests.reduce(
        (sum, test) => sum + (test.price || 0),
        0
      );
      const payload = {
        ...formData,
        totalPrice,
        date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
      };

      const response = await fetch(`/api/editreport/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Report updated successfully!");
        router.push(`/report/${params.id}`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error saving report:", err);
      alert("Failed to save report");
    } finally {
      setSaving(false);
    }
  };

  const renderTestParameters = (test, testIndex) => {
    const testCode = test.testCode;
    const parameters = TEST_PARAMETERS[testCode];

    if (!parameters) {
      return (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Result
          </label>
          <textarea
            value={test.result || ""}
            onChange={(e) =>
              handleTestChange(testIndex, "result", e.target.value)
            }
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter test result..."
          />
        </div>
      );
    }

    const testData = formData.testResults[testCode.toLowerCase()] || {};

    return (
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-3">
          {test.testName} Parameters
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parameters.map((param, paramIndex) => {
            if (param.key === "separator") {
              return (
                <div key={paramIndex} className="col-span-full font-semibold text-gray-800">
                  {param.parameter}
                </div>
              );
            }
            return (
              <div key={paramIndex}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {param.parameter}
                  {param.unit && (
                    <span className="text-gray-500"> ({param.unit})</span>
                  )}
                </label>
                {param.type === "textarea" ? (
                  <textarea
                    value={testData[param.key] || ""}
                    onChange={(e) =>
                      handleTestResultChange(
                        testCode,
                        param.key,
                        e.target.value
                      )
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={param.referenceRange || "Enter description"}
                  />
                ) : param.type === "dropdown" ? (
                  <select
                    value={testData[param.key] || ""}
                    onChange={(e) =>
                      handleTestResultChange(
                        testCode,
                        param.key,
                        e.target.value
                      )
                    }
                    className={`w-full px-3 py-2 border ${
                      validationErrors[`${testCode}_${param.key}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Option</option>
                    {param.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={param.type === "number" ? "number" : "text"}
                    value={testData[param.key] || ""}
                    onChange={(e) =>
                      handleTestResultChange(
                        testCode,
                        param.key,
                        e.target.value
                      )
                    }
                    placeholder={param.referenceRange || "Enter value"}
                    className={`w-full px-3 py-2 border ${
                      validationErrors[`${testCode}_${param.key}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                )}
                {param.referenceRange && (
                  <p className="text-xs text-gray-500 mt-1">
                    Reference: {param.referenceRange}
                  </p>
                )}
                {validationErrors[`${testCode}_${param.key}`] && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors[`${testCode}_${param.key}`]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 text-xl">Loading Report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaArrowLeft />
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg">
          {/* Basic Patient Information */}
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  value={formData.patientName || ""}
                  onChange={(e) =>
                    handleBasicInfoChange("patientName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    validationErrors.patientName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {validationErrors.patientName && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.patientName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="text"
                  value={formData.mobile || ""}
                  onChange={(e) =>
                    handleBasicInfoChange("mobile", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    validationErrors.mobile
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {validationErrors.mobile && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.mobile}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  value={formData.age || ""}
                  onChange={(e) => handleBasicInfoChange("age", e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    validationErrors.age ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {validationErrors.age && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.age}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  value={formData.gender || ""}
                  onChange={(e) =>
                    handleBasicInfoChange("gender", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    validationErrors.gender
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {validationErrors.gender && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.gender}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collected By
                </label>
                <input
                  type="text"
                  value={formData.collectedBy || ""}
                  onChange={(e) =>
                    handleBasicInfoChange("collectedBy", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    validationErrors.collectedBy
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {validationErrors.collectedBy && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.collectedBy}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referred By
                </label>
                <input
                  type="text"
                  value={formData.refBy || ""}
                  onChange={(e) =>
                    handleBasicInfoChange("refBy", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    validationErrors.refBy
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {validationErrors.refBy && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.refBy}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) =>
                    handleBasicInfoChange("date", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    validationErrors.date
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {validationErrors.date && (
                  <p className="text-xs text-red-500 mt-1">
                    {validationErrors.date}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.address || ""}
                onChange={(e) =>
                  handleBasicInfoChange("address", e.target.value)
                }
                rows="3"
                className={`w-full px-3 py-2 border ${
                  validationErrors.address
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {validationErrors.address && (
                <p className="text-xs text-red-500 mt-1">
                  {validationErrors.address}
                </p>
              )}
            </div>
          </div>
          {/* Tests Information */}
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Tests Information
            </h2>
            {formData.tests &&
              formData.tests.map((test, testIndex) => (
                <div
                  key={testIndex}
                  className="mb-6 p-4 border-4 border-gray-200 rounded-lg"
                >
                  <h3 className="font-semibold pb-1 border-b-2 border-green-500 text-gray-800 mb-3">
                    {test.testName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Status
                      </label>
                      <select
                        value={test.status || "Pending"}
                        onChange={(e) =>
                          handleTestChange(testIndex, "status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Code
                      </label>
                      <input
                        type="text"
                        value={test.testCode || ""}
                        onChange={(e) =>
                          handleTestChange(
                            testIndex,
                            "testCode",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border ${
                          validationErrors[`testCode_${testIndex}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        readOnly
                      />
                      {validationErrors[`testCode_${testIndex}`] && (
                        <p className="text-xs text-red-500 mt-1">
                          {validationErrors[`testCode_${testIndex}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={test.price || 0}
                        onChange={(e) =>
                          handleTestChange(testIndex, "price", e.target.value)
                        }
                        className={`w-full px-3 py-2 border ${
                          validationErrors[`price_${testIndex}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {validationErrors[`price_${testIndex}`] && (
                        <p className="text-xs text-red-500 mt-1">
                          {validationErrors[`price_${testIndex}`]}
                        </p>
                      )}
                    </div>
                  </div>
                  {renderTestParameters(test, testIndex)}
                </div>
              ))}
          </div>
          {/* Save Button */}
          <div className="p-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReportComponent;