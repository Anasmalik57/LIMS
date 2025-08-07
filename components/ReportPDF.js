"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaPrint, FaArrowLeft, FaEdit } from "react-icons/fa";
import Image from "next/image";
import QRCode from "./QRCode";
import { useSession } from "next-auth/react";

const TEST_CATEGORIES = {
  HEMATOLOGY: ["CBC001", "AEC001", "BLG001", "BTC001", "HMG001", "ESR001", "MPS001"],
  BIOCHEMISTRY: [
    "BCM001",
    "RFT001",
    "URI001",
    "SCR001",
    "LIP001",
    "SGT001",
    "SER001",
    "HBA001",
    "GTT001",
    "RBS001",
    "FBS001",
    "BRB001",
    "SML001",
    "SLP001",
    "LDH001",
    "KFT001" // Added KFT001 to BIOCHEMISTRY
  ],
  SEROLOGY: ["WID001", "VDR001", "HIV001", "HBS001", "ANT003", "ANT002", "SFB001"],
  RAPID_TEST: ["TDR001", "PGT001", "CKG001"],
  ANTENATAL: ["ANT001"],
  COAGULATION: ["DDI001", "BTC001", "COA001"],
  IMMUNOLOGY: ["RAA001", "RAF001", "CRP001"],
  CARDIOLOGY: ["TPT001"],
  MICROBIOLOGY: ["MPM001"],
  ENDOCRINOLOGY: ["TFT001", "BET001"],
  OTHER: ["MXT001", "URA001", "SFR001"],
};

const TEST_PARAMETERS = {
  CBC001: [
    { key: "hemoglobin", parameter: "Haemoglobin", unit: "g/dL", referenceRange: "13-18" },
    { key: "totalRBC", parameter: "Total R.B.C.", unit: "mil/cumm", referenceRange: "4.5-6.2" },
    { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-11000" },
    { key: "separator", parameter: "DIFFERENTIAL COUNT", unit: "", referenceRange: "" },
    { key: "polymorphs", parameter: "Polymorphs", unit: "%", referenceRange: "40-75" },
    { key: "lymphocytes", parameter: "Lymphocytes", unit: "%", referenceRange: "20-45" },
    { key: "eosinophils", parameter: "Eosinophils", unit: "%", referenceRange: "1-6" },
    { key: "monocytes", parameter: "Monocytes", unit: "%", referenceRange: "2-10" },
    { key: "basophils", parameter: "Basophils", unit: "%", referenceRange: "0-1" },
    { key: "plateletCount", parameter: "Platelet Count", unit: "Lakhs/cmm", referenceRange: "1.5-4.5" },
    { key: "hct", parameter: "H.C.T.", unit: "%", referenceRange: "36-46" },
    { key: "mcv", parameter: "M.C.V.", unit: "fL", referenceRange: "76-96" },
    { key: "mch", parameter: "M.C.H.", unit: "pg", referenceRange: "27-32" },
    { key: "mchc", parameter: "M.C.H.C.", unit: "g/dL", referenceRange: "32-36" },
    { key: "rdw", parameter: "R.D.W.", unit: "%", referenceRange: "11.5-14.5" },
    { key: "mpv", parameter: "M.P.V.", unit: "fL", referenceRange: "7.4-10.4" },
  ],
  WID001: [
    { key: "salmonellaO", parameter: "Salmonella Typhi - O", unit: "", referenceRange: "<1:80" },
    { key: "salmonellaH", parameter: "Salmonella Typhi - H", unit: "", referenceRange: "<1:80" },
    { key: "widalConclusion", parameter: "Widal Conclusion", unit: "", referenceRange: "" },
  ],
  BCM001: [
    { key: "separator", parameter: "LIVER FUNCTION TESTS", unit: "", referenceRange: "" },
    { key: "totalBilirubin", parameter: "Total Bilirubin", unit: "mg/dL", referenceRange: "0.2-1.0" },
    { key: "directBilirubin", parameter: "Direct Bilirubin", unit: "mg/dL", referenceRange: "0-0.4" },
    { key: "indirectBilirubin", parameter: "Indirect Bilirubin", unit: "mg/dL", referenceRange: "0-0.5" },
    { key: "alkalinePhosphatase", parameter: "S. Alkaline Phosphatase", unit: "U/L", referenceRange: "60-170" },
    { key: "sgpt", parameter: "Alanine Transaminase (ALT/SGPT)", unit: "U/L", referenceRange: "5-50" },
    { key: "sgot", parameter: "Aspartate Transaminase (AST/SGOT)", unit: "U/L", referenceRange: "5-50" },
    { key: "totalProtein", parameter: "Total Protein", unit: "g/dL", referenceRange: "6-8" },
    { key: "albumin", parameter: "Albumin", unit: "g/dL", referenceRange: "3.5-4.5" },
    { key: "globulin", parameter: "Globulin", unit: "g/dL", referenceRange: "2.5-3.5" },
    { key: "agRatio", parameter: "A/G Ratio", unit: "mgm%", referenceRange: "1.3-4.0" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  TDR001: [
    { key: "styphiIgG", parameter: "S. Typhi IgG", unit: "", referenceRange: "" },
    { key: "styphiIgM", parameter: "S. Typhi IgM", unit: "", referenceRange: "" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Chromatographic Immunoassay" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  VDR001: [
    { key: "vdrlResult", parameter: "VDRL Result", unit: "", referenceRange: "" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  RFT001: [
    { key: "bloodUrea", parameter: "Blood Urea", unit: "mg/dL", referenceRange: "10-45" },
    { key: "bun", parameter: "Blood Urea Nitrogen", unit: "mg/dL", referenceRange: "3.3-18.7" },
    { key: "sCreatinine", parameter: "Serum Creatinine", unit: "mg/dL", referenceRange: "0.6-1.4" },
    { key: "serumUricAcid", parameter: "Serum Uric Acid", unit: "mg/dL", referenceRange: "2-8" },
    { key: "totalProtein", parameter: "Total Protein", unit: "g/dL", referenceRange: "6-8" },
    { key: "sAlbumin", parameter: "Serum Albumin", unit: "g/dL", referenceRange: "3.5-4.5" },
    { key: "sGlobulin", parameter: "Serum Globulin", unit: "g/dL", referenceRange: "2.5-3.5" },
    { key: "agRatio", parameter: "A/G Ratio", unit: "mgm%", referenceRange: "1.3-4.0" },
  ],
  URI001: [
    { key: "serumUricAcid", parameter: "Serum Uric Acid", unit: "mg/dL", referenceRange: "2.0-7.0" },
  ],
  SCR001: [
    { key: "sCreatinine", parameter: "Serum Creatinine", unit: "mg/dL", referenceRange: "0.8-1.4" },
  ],
  LIP001: [
    { key: "serumTotalCholesterol", parameter: "Serum Total Cholesterol", unit: "mg/dL", referenceRange: "100-200" },
    { key: "serumTriglyceride", parameter: "Serum Triglycerides", unit: "mg/dL", referenceRange: "65-150" },
    { key: "hdlCholesterol", parameter: "HDL Cholesterol", unit: "mg/dL", referenceRange: "30-60" },
    { key: "sLDLCholesterol", parameter: "LDL Cholesterol", unit: "mg/dL", referenceRange: "0-100" },
    { key: "sVLDLCholesterol", parameter: "VLDL Cholesterol", unit: "mg/dL", referenceRange: "6-40" },
    { key: "nonHDLCholesterol", parameter: "Non-HDL Cholesterol", unit: "mg/dL", referenceRange: "0-130" },
    { key: "cholesterolHDLRatio", parameter: "Cholesterol/HDL Ratio", unit: "", referenceRange: "0-5.0" },
    { key: "ldlHDLRatio", parameter: "LDL/HDL Ratio", unit: "", referenceRange: "0-3.5" },
  ],
  ANT001: [
    { key: "hemoglobin", parameter: "Haemoglobin", unit: "mg/dL", referenceRange: "14-17" },
    { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-10000" },
    { key: "bgRh", parameter: "Blood Group & Rh Typing", unit: "", referenceRange: "" },
    { key: "rbc", parameter: "R.B.C.", unit: "mil/cumm", referenceRange: "4.0-5.2" },
    { key: "rbs", parameter: "Random Blood Sugar", unit: "mg/dL", referenceRange: "70-140" },
    { key: "vdrl", parameter: "VDRL", unit: "", referenceRange: "Non-reactive" },
    { key: "plateletCount", parameter: "Platelet Count", unit: "Lakhs/cmm", referenceRange: "1.5-4.5" },
    { key: "hiv", parameter: "HIV", unit: "", referenceRange: "Non-Reactive" },
    { key: "hbsag", parameter: "HBsAg", unit: "", referenceRange: "Non-Reactive" },
  ],
  DDI001: [
    { key: "dDimer", parameter: "D-Dimer", unit: "ng/mL", referenceRange: "0-500" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  BTC001: [
    { key: "bleedingTime", parameter: "Bleeding Time", unit: "", referenceRange: "2-7 min" },
    { key: "clottingTime", parameter: "Clotting Time", unit: "", referenceRange: "4-11 min" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  RAA001: [
    { key: "rfa", parameter: "Rheumatoid Factor Assay", unit: "IU/mL", referenceRange: "0-20" },
    { key: "asoTest", parameter: "ASO Test", unit: "IU/mL", referenceRange: "0-200" },
    { key: "crpTest", parameter: "CRP Test", unit: "mg/L", referenceRange: "upto 6.0" },
  ],
  SGT001: [
    { key: "sgot", parameter: "SGOT (AST)", unit: "U/L", referenceRange: "6-38" },
  ],
  COA001: [
    { key: "coagBleedingTimeMin", parameter: "Bleeding Time (Min)", unit: "min", referenceRange: "3-10" },
    { key: "coagBleedingTimeSec", parameter: "Bleeding Time (Sec)", unit: "sec", referenceRange: "" },
    { key: "coagClottingTimeMin", parameter: "Clotting Time (Min)", unit: "min", referenceRange: "2-7" },
    { key: "coagClottingTimeSec", parameter: "Clotting Time (Sec)", unit: "sec", referenceRange: "" },
    { key: "coagClotRetraction", parameter: "Clot Retraction", unit: "", referenceRange: "" },
    { key: "hemoPlateletCount", parameter: "Platelet Count", unit: "Lakhs/cmm", referenceRange: "1.5-4.5" },
    { key: "coagProthrombinTimeControl", parameter: "Prothrombin Time (Control)", unit: "sec", referenceRange: "10.3-12.8" },
    { key: "coagProthrombinTimePatient", parameter: "Prothrombin Time (Patient)", unit: "sec", referenceRange: "10-14" },
    { key: "coagINR", parameter: "INR", unit: "", referenceRange: "0.8-1.2" },
    { key: "coagISI", parameter: "ISI", unit: "", referenceRange: "" },
    { key: "coagProthrombinIndex", parameter: "Prothrombin Index", unit: "", referenceRange: "" },
    { key: "coagProthrombinRatio", parameter: "Prothrombin Ratio", unit: "", referenceRange: "" },
    { key: "coagAPTTTest", parameter: "APTT (Test)", unit: "sec", referenceRange: "25-37" },
    { key: "coagAPTTControl", parameter: "APTT (Control)", unit: "sec", referenceRange: "25-35" },
    { key: "coagFDP", parameter: "FDP", unit: "µg/mL", referenceRange: "0-5.0" },
    { key: "coagFactorXIIIScreening", parameter: "Factor XIII Screening", unit: "", referenceRange: "" },
    { key: "coagThrombinTime", parameter: "Thrombin Time", unit: "", referenceRange: "" },
    { key: "plasmaRecalcificationTime", parameter: "Plasma Recalcification Time", unit: "sec", referenceRange: "" },
    { key: "factorVIIIAssay", parameter: "Factor VIII Assay", unit: "%", referenceRange: "" },
    { key: "dDimer", parameter: "D-Dimer", unit: "mg/L", referenceRange: "" },
    { key: "plasmaFibrinogen", parameter: "Plasma Fibrinogen", unit: "mg/dL", referenceRange: "200-400" },
    { key: "coagNote", parameter: "Note", unit: "", referenceRange: "" },
  ],
  AEC001: [
    { key: "totalEAC", parameter: "Absolute Eosinophil Count", unit: "/cumm", referenceRange: "40-440" },
  ],
  SER001: [
    { key: "sodium", parameter: "Sodium", unit: "mEq/L", referenceRange: "135-145" },
    { key: "potassium", parameter: "Potassium", unit: "mEq/L", referenceRange: "3.5-5.4" },
    { key: "chlorides", parameter: "Chlorides", unit: "mEq/L", referenceRange: "96-106" },
    { key: "calcium", parameter: "Calcium", unit: "", referenceRange: "" },
    { key: "elecInorganicPhosphorous", parameter: "Inorganic Phosphorus", unit: "", referenceRange: "" },
    { key: "elecLithium", parameter: "Lithium", unit: "mEq/L", referenceRange: "" },
    { key: "splBicarbonate", parameter: "Bicarbonate", unit: "mEq/L", referenceRange: "" },
    { key: "elecMagnesium", parameter: "Magnesium", unit: "mg/dL", referenceRange: "" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "ION Selected Electrodes (ISE) Direct" },
    { key: "instrumentUsed", parameter: "Instrument Used", unit: "", referenceRange: "YUCCA SENSA CORE Electrolyte Analyzer" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  TPT001: [
    { key: "troponin", parameter: "Troponin-T", unit: "", referenceRange: "Negative" },
  ],
  BLG001: [
    { key: "aboGroupingSystem", parameter: "ABO Grouping", unit: "", referenceRange: "" },
    { key: "rhoTyping", parameter: "Rh Typing", unit: "", referenceRange: "Positive/Negative" },
  ],
  MPM001: [
    { key: "malariaParasites", parameter: "Malaria Parasites", unit: "", referenceRange: "Positive/Negative" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Microscopic Examination" },
  ],
  RAF001: [
    { key: "rheumatoidFactorAssay", parameter: "Rheumatoid Factor Assay", unit: "IU/mL", referenceRange: "0-20" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  CRP001: [
    { key: "crp", parameter: "C-Reactive Protein", unit: "", referenceRange: "0-10" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  ANT002: [
    { key: "igg", parameter: "Scrub Typhus IgG", unit: "", referenceRange: "Negative/Positive" },
    { key: "igm", parameter: "Scrub Typhus IgM", unit: "", referenceRange: "Negative/Positive" },
  ],
  HBA001: [
    { key: "glycatedHemoglobin", parameter: "HbA1c", unit: "%", referenceRange: "" },
    { key: "estimatedAverageGlucose", parameter: "Estimated Average Glucose", unit: "mg/dL", referenceRange: "" },
  ],
  BET001: [
    { key: "betaHCG", parameter: "Beta HCG", unit: "mIU/mL", referenceRange: "0-5 (Non-pregnant)" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  HIV001: [
    { key: "hivIII", parameter: "HIV I-II", unit: "", referenceRange: "Non-reactive" },
  ],
  HBS001: [
    { key: "hepatitisBSurfaceAntigen", parameter: "HBsAg", unit: "", referenceRange: "Negative/Positive" },
    { key: "doneBy", parameter: "Method", unit: "", referenceRange: "Rapid Card Method" },
  ],
  ANT003: [
    { key: "hepatitisCSurfaceAntigen", parameter: "Anti-HCV", unit: "", referenceRange: "Non-reactive" },
  ],
  TFT001: [
    { key: "totalT3", parameter: "Total T3", unit: "ng/dL", referenceRange: "60-200" },
    { key: "totalT4", parameter: "Total T4", unit: "µg/dL", referenceRange: "4.5-14.5" },
    { key: "tsh", parameter: "TSH", unit: "µIU/mL", referenceRange: "0.35-5.5" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  GTT001: [
    { key: "glucoseToleranceTest", parameter: "Glucose Tolerance Test", unit: "", referenceRange: "" },
    { key: "fglb", parameter: "Fasting Glucose Level (Basal)", unit: "mg/dL", referenceRange: "70-100" },
    { key: "fugl", parameter: "Fasting Urine Glucose Level", unit: "", referenceRange: "Negative" },
    { key: "g1pgl", parameter: "Glucose 1.0 hr Post Glucose Load", unit: "mg/dL", referenceRange: "<140" },
    { key: "ugl1h", parameter: "Glucose Urine Level 1st Hour", unit: "", referenceRange: "Negative" },
    { key: "g2pgl", parameter: "Glucose 2.0 hr Post Glucose Load", unit: "mg/dL", referenceRange: "<140" },
    { key: "ugl2h", parameter: "Glucose Urine Level 2nd Hour", unit: "", referenceRange: "Negative" },
    { key: "g3pgl", parameter: "Glucose 3.0 hr Post Glucose Load", unit: "mg/dL", referenceRange: "<140" },
    { key: "ugl3h", parameter: "Glucose Urine Level 3rd Hour", unit: "", referenceRange: "Negative" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  MXT001: [
    { key: "inDiameter", parameter: "In Diameter", unit: "mm", referenceRange: "" },
    { key: "result", parameter: "Result", unit: "", referenceRange: "Positive/Negative" },
  ],
  HMG001: [
    { key: "hemoglobin", parameter: "Haemoglobin", unit: "g/dL", referenceRange: "13-18" },
    { key: "totalRBC", parameter: "Total R.B.C.", unit: "mil/cumm", referenceRange: "4.5-6.2" },
    { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-11000" },
    { key: "lymphocytes", parameter: "Lymphocytes", unit: "%", referenceRange: "20-45" },
    { key: "eosinophils", parameter: "Eosinophils", unit: "%", referenceRange: "1-6" },
    { key: "monocytes", parameter: "Monocytes", unit: "%", referenceRange: "2-10" },
    { key: "basophils", parameter: "Basophils", unit: "%", referenceRange: "0-1" },
    { key: "polymorphs", parameter: "Polymorphs", unit: "%", referenceRange: "40-75" },
  ],
  ESR001: [
    { key: "esr1h", parameter: "Erythrocyte Sedimentation Rate (1st Hour)", unit: "mm/hr", referenceRange: "0-20" },
    { key: "esrAvg", parameter: "ESR (Average)", unit: "mm/hr", referenceRange: "0-20" },
  ],
  MPS001: [
    { key: "malariaPArasites", parameter: "Malaria Parasites", unit: "", referenceRange: "Negative/Positive" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "" },
  ],
  PGT001: [
    { key: "pregnancyTestSample", parameter: "Sample Time", unit: "", referenceRange: "" },
    { key: "lmp", parameter: "LMP", unit: "", referenceRange: "" },
    { key: "pregnancyTestResult", parameter: "Pregnancy Test Result", unit: "", referenceRange: "Negative/Positive" },
    { key: "pregnancyIndi", parameter: "Indication", unit: "", referenceRange: "" },
    { key: "pregnancySenstivity", parameter: "Sensitivity", unit: "", referenceRange: "" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Chromatographic Immunoassay" },
  ],
  URA001: [
    { key: "separator", parameter: "PHYSICAL EXAMINATION", unit: "", referenceRange: "" },
    { key: "color", parameter: "Color", unit: "", referenceRange: "" },
    { key: "transparency", parameter: "Transparency", unit: "", referenceRange: "" },
    { key: "reaction", parameter: "Reaction", unit: "", referenceRange: "" },
    { key: "specificGravity", parameter: "Specific Gravity", unit: "", referenceRange: "" },
    { key: "separator", parameter: "BIOCHEMICAL EXAMINATION", unit: "", referenceRange: "" },
    { key: "protein", parameter: "Protein", unit: "", referenceRange: "Negative" },
    { key: "sugar", parameter: "Sugar", unit: "", referenceRange: "Negative" },
    { key: "ketone", parameter: "Ketone", unit: "", referenceRange: "Negative" },
    { key: "bilePigment", parameter: "Bile Pigment", unit: "", referenceRange: "Negative" },
    { key: "bileSalt", parameter: "Bile Salt", unit: "", referenceRange: "Negative" },
    { key: "urobilinogen", parameter: "Urobilinogen", unit: "", referenceRange: "Normal" },
    { key: "separator", parameter: "MICROSCOPIC EXAMINATION", unit: "", referenceRange: "" },
    { key: "pusCells", parameter: "Pus Cells (Leukocytes)", unit: "/HPF", referenceRange: "0-5" },
    { key: "rbc", parameter: "RBC's (Erythrocytes)", unit: "/HPF", referenceRange: "0-3" },
    { key: "morphologyOfRBC", parameter: "Morphology of RBC", unit: "", referenceRange: "" },
    { key: "epithelialCells", parameter: "Epithelial Cells", unit: "/HPF", referenceRange: "0-5" },
    { key: "crystals", parameter: "Crystals", unit: "", referenceRange: "None" },
    { key: "casts", parameter: "Casts", unit: "", referenceRange: "None" },
    { key: "amorphousCrystals", parameter: "Amorphous Crystals", unit: "", referenceRange: "None" },
    { key: "backteriaFlora", parameter: "Bacterial Flora", unit: "", referenceRange: "None" },
    { key: "note", parameter: "Note", unit: "", referenceRange: "" },
  ],
  LDH001: [
    { key: "ldh", parameter: "Lactic Acid Dehydrogenase (LDH)", unit: "U/L", referenceRange: "140-280" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Lactate to Pyruvate" },
    { key: "description1", parameter: "Description 1", unit: "", referenceRange: "" },
    { key: "description2", parameter: "Description 2", unit: "", referenceRange: "" },
    { key: "description3", parameter: "Description 3", unit: "", referenceRange: "" },
    { key: "description4", parameter: "Description 4", unit: "", referenceRange: "" },
  ],
  RBS001: [
    { key: "randomBloodSugar", parameter: "Random Blood Sugar", unit: "mg/dL", referenceRange: "70-140" },
    { key: "method1", parameter: "Method 1", unit: "", referenceRange: "By GOD POD" },
    { key: "method2", parameter: "Method 2", unit: "", referenceRange: "Semi Automated Access/127 / Yucca Diagnostics" },
  ],
  FBS001: [
    { key: "fastingBloodSugar", parameter: "Fasting Blood Sugar", unit: "mg/dL", referenceRange: "70-100" },
  ],
  CKG001: [
    { key: "result", parameter: "Result", unit: "", referenceRange: "Positive/Negative" },
  ],
  BRB001: [
    { key: "bilirubinTotal", parameter: "Bilirubin Total", unit: "mg/dL", referenceRange: "0.2-1.0" },
    { key: "serumMethod1", parameter: "Method 1", unit: "", referenceRange: "By Modified Tab Method" },
    { key: "bilirubinDirect", parameter: "Bilirubin Direct", unit: "mg/dL", referenceRange: "0-0.4" },
    { key: "serumMethod2", parameter: "Method 2", unit: "", referenceRange: "Diazotization" },
    { key: "bilirubinIndirect", parameter: "Bilirubin Indirect", unit: "mg/dL", referenceRange: "0-0.5" },
    { key: "serumMethod3", parameter: "Method 3", unit: "", referenceRange: "Calculated" },
  ],
  SFR001: [
    { key: "methodOfCollection", parameter: "Method of Collection", unit: "", referenceRange: "" },
    { key: "periodOfAbstinence", parameter: "Period of Abstinence", unit: "days", referenceRange: "" },
    { key: "timeOfCollection", parameter: "Time of Collection", unit: "", referenceRange: "" },
    { key: "timeOfExamination", parameter: "Time of Examination", unit: "", referenceRange: "" },
    { key: "quantity", parameter: "Quantity", unit: "mL", referenceRange: "" },
    { key: "color", parameter: "Color", unit: "", referenceRange: "" },
    { key: "viscosity", parameter: "Viscosity", unit: "", referenceRange: "" },
    { key: "liquificationTIme", parameter: "Liquefaction Time", unit: "min", referenceRange: "" },
    { key: "reaction", parameter: "Reaction", unit: "", referenceRange: "" },
    { key: "fructoseTest", parameter: "Fructose Test", unit: "", referenceRange: "" },
    { key: "totalSpermCount", parameter: "Total Sperm Count", unit: "million/mL", referenceRange: "15-200" },
    { key: "motilityImmediate", parameter: "Motility Immediate (Actively Motile)", unit: "%", referenceRange: "" },
    { key: "slugishlyMotil", parameter: "Sluggishly Motile", unit: "%", referenceRange: "" },
    { key: "nonMotile", parameter: "Non-Motile", unit: "%", referenceRange: "" },
    { key: "motility", parameter: "Motility After 2 hrs (Actively Motile)", unit: "%", referenceRange: "" },
    { key: "abnormalFormsHead", parameter: "Abnormal Forms (Head)", unit: "%", referenceRange: "" },
    { key: "body", parameter: "Body", unit: "%", referenceRange: "" },
    { key: "tails", parameter: "Tails", unit: "%", referenceRange: "" },
    { key: "immatureForms", parameter: "Immature Forms", unit: "%", referenceRange: "" },
    { key: "pusCells", parameter: "Pus Cells", unit: "/HPF", referenceRange: "" },
    { key: "redCells", parameter: "Red Cells", unit: "/HPF", referenceRange: "" },
    { key: "epithelialCell", parameter: "Epithelial Cells", unit: "/HPF", referenceRange: "" },
    { key: "autoAgglutination", parameter: "Auto Agglutination", unit: "", referenceRange: "" },
    { key: "gramsStain", parameter: "Gram's Stain", unit: "", referenceRange: "" },
    { key: "totalSperCountAfterWash", parameter: "Total Sperm Count After Wash", unit: "million/mL", referenceRange: "" },
    { key: "Impression", parameter: "Impression", unit: "", referenceRange: "" },
  ],
  SML001: [
    { key: "serumAmylase", parameter: "Serum Amylase", unit: "U/L", referenceRange: "28-100" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Enzymatic" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  SLP001: [
    { key: "serumLipase", parameter: "Serum Lipase", unit: "U/L", referenceRange: "13-60" },
    { key: "method", parameter: "Method", unit: "", referenceRange: "Enzymatic" },
    { key: "description", parameter: "Description", unit: "", referenceRange: "" },
  ],
  SFB001: [
    { key: "sputumForAFB_Stain", parameter: "Sputum for AFB Stain", unit: "", referenceRange: "Negative/Positive" },
  ],
  KFT001: [
    { key: "urea", parameter: "Urea", unit: "mg/dL", referenceRange: "10-45" },
    { key: "creatine", parameter: "Creatinine", unit: "mg/dL", referenceRange: "0.6-1.4" },
    { key: "bun", parameter: "Blood Urea Nitrogen (BUN)", unit: "mg/dL", referenceRange: "3.3-18.7" },
    { key: "bunCreatineRatio", parameter: "BUN/Creatinine Ratio", unit: "", referenceRange: "10-20" },
    { key: "uricAid", parameter: "Uric Acid", unit: "mg/dL", referenceRange: "2.0-7.0" },
    { key: "sodium", parameter: "Sodium", unit: "mEq/L", referenceRange: "135-145" },
    { key: "potassium", parameter: "Potassium", unit: "mmol/L", referenceRange: "3.5-5.0" },
  ],
};

const TEST_NAMES = {
  CBC001: "Complete Blood Count (CBC)",
  WID001: "Widal Test",
  BCM001: "Liver Function Test (LFT)",
  TDR001: "Typhi DOT (Rapid)",
  VDR001: "VDRL Test",
  RFT001: "Renal Function Test (RFT)",
  URI001: "Serum Uric Acid",
  SCR001: "Serum Creatinine",
  LIP001: "Lipid Profile",
  ANT001: "Antenatal Profile",
  DDI001: "D-Dimer",
  BTC001: "Bleeding Time & Clotting Time (BTCT)",
  RAA001: "RA-ASO-CRP",
  SGT001: "SGOT (AST)",
  COA001: "Coagulation Profile",
  AEC001: "Absolute Eosinophil Count (AEC)",
  SER001: "Serum Electrolytes",
  TPT001: "Troponin-T",
  BLG001: "Blood Group",
  MPM001: "Malaria Parasites (MP)",
  RAF001: "RA Factor",
  CRP001: "C-Reactive Protein (CRP)",
  ANT002: "Scrub Typhus (Antibody)",
  HBA001: "HbA1c (Glycated Hemoglobin)",
  BET001: "Beta HCG",
  HIV001: "HIV I-II",
  HBS001: "HBsAg",
  ANT003: "Anti-HCV",
  TFT001: "Thyroid Function Test (TFT)",
  GTT001: "Glucose Tolerance Test (GTT)",
  MXT001: "Mantoux Test",
  HMG001: "Haemogram Report",
  ESR001: "Erythrocyte Sedimentation Rate (ESR)",
  MPS001: "Malaria Parasites",
  PGT001: "Pregnancy Test",
  URA001: "Urine Analysis",
  LDH001: "Lactic Acid Dehydrogenase (LDH)",
  RBS001: "Random Blood Sugar Level",
  FBS001: "Fasting Blood Sugar Level",
  CKG001: "Chikungunya",
  BRB001: "Bilirubin",
  SFR001: "Seminal Fluid Report",
  SML001: "Serum Amylase",
  SLP001: "Serum Lipase",
  SFB001: "Sputum AFB",
};

const ReportPDF = () => {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/report/${params.id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.success) setReport(data.report);
        else setError(data.message || "Failed to fetch report");
      } catch (err) {
        setError("Failed to fetch report");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchReport();
  }, [params.id]);

  const handlePrint = () => window.print();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const getReportHeading = () => {
    if (!report || !report.tests) return "LABORATORY REPORT";
    const testCodes = report.tests.map((test) => test.testCode);
    const category = Object.entries(TEST_CATEGORIES).find(([_, codes]) =>
      testCodes.some((code) => codes.includes(code))
    );
    return category ? `${category[0]} REPORT` : "LABORATORY REPORT";
  };

  const renderTestResults = (testCode, testData) => {
    if (!testData || !TEST_PARAMETERS[testCode]) return null;

    const testName = TEST_NAMES[testCode] || testCode;
    const parameters = TEST_PARAMETERS[testCode];

    return (
      <div className="mb-8" key={testCode}>
        <h3 className="font-bold text-gray-800 mb-4 text-lg">
          {testName.toUpperCase()}
        </h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="font-medium text-gray-700">Parameter</div>
          <div className="font-medium text-gray-700">Result</div>
          <div className="font-medium text-gray-700">Unit</div>
          <div className="font-medium text-gray-700">Reference Range</div>
        </div>
        <hr className="my-2 border-gray-300" />
        {parameters.map((param, idx) => {
          if (param.key === "separator") {
            return (
              <div key={idx} className="grid grid-cols-4 gap-4 text-sm py-2">
                <div className="text-gray-800 font-semibold col-span-4">
                  {param.parameter}
                </div>
              </div>
            );
          }

          const value = testData[param.key];
          const displayValue = value && value.trim() !== "" ? value : "N/A";

          const isDescription = param.parameter.toLowerCase().includes("description");

          if (isDescription) {
            if (displayValue === "N/A") return null;
            
            const sentences = displayValue
              .split("• ")
              .map((sentence) => sentence.trim())
              .filter((sentence) => sentence.length > 0);

            return (
              <div key={idx} className="grid grid-cols-4 gap-4 text-sm py-1">
                <div className="text-gray-800 col-span-4">
                  {sentences.map((sentence, i) => (
                    <p key={i} className="mb-1">{sentence}.</p>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={idx} className="grid grid-cols-4 gap-4 text-sm py-1">
              <div className="text-gray-700">{param.parameter}</div>
              <div className="text-gray-800 font-medium">{displayValue}</div>
              <div className="text-gray-700">{param.unit}</div>
              <div className="text-gray-700">{param.referenceRange}</div>
            </div>
          );
        })}
        {report.tests.find((test) => test.testCode === testCode)?.status && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>Status:</strong>{" "}
              {report.tests.find((test) => test.testCode === testCode).status}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderAllTestResults = () => {
    if (!report || !report.tests) return null;
    return report.tests
      .map((test) => renderTestResults(test.testCode, report.testResults?.[test.testCode.toLowerCase()]))
      .filter(Boolean);
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

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">The requested report could not be found.</p>
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

  const pathname = window.location.href;

  return (
    <div className="min-h-screen bg-gray-100 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto print:mt-0">
        {status === "authenticated" ? (
          <div className="mt-4 flex items-center justify-between mb-6 print:hidden">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FaArrowLeft />
              Back
            </button>
            <div className="flex gap-3">
              <Link
                href={`/editreport/${params.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaEdit />
                Edit
              </Link>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPrint />
                Print
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 mb-2 print:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPrint />
            Print
          </button>
        )}
        <div className="bg-white shadow-lg border relative border-gray-300 print:shadow-none print:border-0">
          <div className="absolute top-8 -right-20 translate-x-20">
            {showHeader ? (
              <button
                onClick={() => setShowHeader(false)}
                className="border px-4 py-2 rounded-full shadow-xl cursor-pointer text-white bg-gradient-to-tl to-violet-500 from-blue-500"
              >
                Hide Header
              </button>
            ) : (
              <button
                onClick={() => setShowHeader(true)}
                className="border px-4 py-2 rounded-full shadow-xl cursor-pointer text-white bg-gradient-to-tl to-violet-500 from-blue-500"
              >
                Show Header
              </button>
            )}
          </div>
          {showHeader && (
            <div className="border-b border-gray-300 p-6 px-0 bg-gradient-to-tl from-blue-300 via-blue-300 to-blue-400">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 w-full px-2 justify-between">
                  <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center border-[1.2px] border-blue-500">
                    <div className="w-12 h-12 p-1 rounded-full flex items-center justify-center">
                      <Image
                        src={"/global_labs_Logo.png"}
                        width={300}
                        height={300}
                        alt="global_labs_Logo"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 border-2 rounded-sm border-gray-800 px-4 py-1 print:text-2xl">
                      GLOBAL PATHOLOGY LAB
                    </h1>
                  </div>
                  <div className="*:font-semibold">
                    <p className="text-red-600 text-sm font-semibold mt-1">
                      Shekhpuri Roorkee, Haridwar (U.K)
                    </p>
                    <p className="text-gray-700 text-sm">Phone: 9927782011, 9084648712</p>
                    <p className="text-gray-700 text-xs">
                      Email: imrantyagi201@gmail.com, javadmalik379@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="p-6 border-b border-gray-300 relative">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Collected by</span>
                  <span className="text-gray-700">: {report.collectedBy || "Main Branch"}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Patient&#39;s Name</span>
                  <span className="text-gray-700">
                    : <strong>{report.patientName.toUpperCase()}</strong>
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Age / Gender</span>
                  <span className="text-gray-700">: {report.age} Yrs, {report.gender}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Ref. By</span>
                  <span className="text-gray-700">: {report.refBy || "Self"}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">UHID</span>
                  <span className="text-gray-700">: {report.mobile}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Reg. No.</span>
                  <span className="text-gray-700">: {report._id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Patient ID</span>
                  <span className="text-gray-700">: {formatDate(report.date).replace(/\//g, "")}</span> {/* CHANGED: report.createdAt to report.date */}
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Collection Date</span>
                  <span className="text-gray-700">
                    : {formatDate(report.date)} {formatTime(report.date)} {/* CHANGED: report.createdAt to report.date */}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Received Date</span>
                  <span className="text-gray-700">: {formatDate(report.date)}</span> {/* CHANGED: report.createdAt to report.date */}
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">Reporting Date</span>
                  <span className="text-gray-700">
                    : {formatDate(report.date)} {formatTime(report.date)} {/* CHANGED: report.createdAt to report.date */}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-6 border rounded-xs bg-slate-500">
              <QRCode param={pathname} />
            </div>
          </div>
          <div className="p-6 py-2 border-b border-gray-300">
            <div className="flex">
              <span className="w-32 text-gray-700 font-medium">Investigations</span>
              <span className="text-gray-700">: {report.tests.map((test) => test.testCode).join(", ")}</span>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-green-700 mb-6 underline">
              {getReportHeading()}
            </h2>
            <div className="space-y-6">{renderAllTestResults()}</div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-2">*** End of Report ***</p>
            </div>
          </div>
          <div className="p-6 border-t border-gray-300">
            <div className="flex justify-between items-end">
              <div className="text-center gap-0 relative">
                <Image
                  src={"/image.png"}
                  width={100}
                  height={50}
                  alt="Dr. M Tyagi"
                  className="absolute top-4 left-3"
                />
                <div className="w-32 h-16 border-b border-gray-400 mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">DR AZAM TYAGI</p>
                <p className="text-xs text-gray-600">M.D PATHOLOGIST 66154</p>
              </div>
              <div className="text-center relative">
                <Image
                  src={"/image.png"}
                  width={100}
                  height={50}
                  alt="Dr. M Tyagi"
                  className="absolute top-4 left-3"
                />
                <div className="w-32 h-16 border-b border-gray-400 mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">M.TYAGI (B.M.L.T)</p>
                <p className="text-xs text-gray-600 opacity-0">BMLT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPDF;