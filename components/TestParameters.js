 // Define test parameters mapping
export const TEST_PARAMETERS = {
  CBC001: [
    { parameter: "HAEMOGLOBIN", dbField: "hemoglobin", unit: "mg/dl", referenceRange: "13-18" },
    { parameter: "Total R.B.C.", dbField: "totalRBC", unit: "mil/cumm", referenceRange: "4.5-6.2" },
    { parameter: "Total W.B.C.", dbField: "totalWBC", unit: "/cumm", referenceRange: "4000-11000" },
    { parameter: "Polymorphs", dbField: "polymorphs", unit: "%", referenceRange: "20-45" },
    { parameter: "Lymphocytes", dbField: "lymphocytes", unit: "%", referenceRange: "20-45" },
    { parameter: "Eosinophils", dbField: "eosinophils", unit: "%", referenceRange: "1-6" },
    { parameter: "Monocytes", dbField: "monocytes", unit: "%", referenceRange: "2-8" },
    { parameter: "Basophils", dbField: "basophils", unit: "%", referenceRange: "0-1" },
    { parameter: "PLATELET COUNT", dbField: "plateletCount", unit: "Lakhs/cmm", referenceRange: "1.5-4.5" },
    { parameter: "H.C.T.", dbField: "hct", unit: "%", referenceRange: "45-52" },
    { parameter: "M.C.V.", dbField: "mcv", unit: "fl", referenceRange: "84-96" },
    { parameter: "M.C.H.", dbField: "mch", unit: "pg", referenceRange: "27-32" },
    { parameter: "M.C.H.C.", dbField: "mchc", unit: "g/dl", referenceRange: "30-36" },
    { parameter: "R.D.W.", dbField: "rdw", unit: "%", referenceRange: "10.0-15.0" },
    { parameter: "M.P.V.", dbField: "mpv", unit: "", referenceRange: "6.5-11.0" },
  ],
  WID001: [
    { parameter: "Salmonella typhi - O", dbField: "salmonellaO", unit: "", referenceRange: "1:80 or More Significant Titre 1:80 or More" },
    { parameter: "Salmonella Typhi - H", dbField: "salmonellaH", unit: "", referenceRange: "1:80 or More Significant Titre 1:80 or More" },
    { parameter: "Widal Conclusion", dbField: "widalConclusion", unit: "", referenceRange: "" },
  ],
  BCM001: [
    { parameter: "Total Bilirubin", dbField: "totalBilirubin", unit: "mg/dl", referenceRange: "0.2-1.2" },
    { parameter: "Direct Bilirubin", dbField: "directBilirubin", unit: "mg/dl", referenceRange: "0.0-0.4" },
    { parameter: "Indirect Bilirubin", dbField: "indirectBilirubin", unit: "mg/dl", referenceRange: "0.2-0.8" },
    { parameter: "SGOT (AST)", dbField: "sgot", unit: "U/L", referenceRange: "5-40" },
    { parameter: "SGPT (ALT)", dbField: "sgpt", unit: "U/L", referenceRange: "5-40" },
    { parameter: "Alkaline Phosphatase", dbField: "alkalinePhosphatase", unit: "U/L", referenceRange: "44-147" },
    { parameter: "Urea", dbField: "urea", unit: "mg/dl", referenceRange: "15-40" },
    { parameter: "Creatinine", dbField: "creatinine", unit: "mg/dl", referenceRange: "0.6-1.2" },
    { parameter: "Uric Acid", dbField: "uricAcid", unit: "mg/dl", referenceRange: "3.5-7.2" },
    { parameter: "Total Cholesterol", dbField: "totalCholesterol", unit: "mg/dl", referenceRange: "<200" },
    { parameter: "Triglycerides", dbField: "triglycerides", unit: "mg/dl", referenceRange: "<150" },
    { parameter: "HDL Cholesterol", dbField: "hdlCholesterol", unit: "mg/dl", referenceRange: ">40" },
    { parameter: "LDL Cholesterol", dbField: "ldlCholesterol", unit: "mg/dl", referenceRange: "<100" },
    { parameter: "Fasting Glucose", dbField: "fastingGlucose", unit: "mg/dl", referenceRange: "70-100" },
    { parameter: "Random Glucose", dbField: "randomGlucose", unit: "mg/dl", referenceRange: "<140" },
  ],
  MCP001: [
    { parameter: "Color", dbField: "color", unit: "", referenceRange: "Yellow" },
    { parameter: "Appearance", dbField: "appearance", unit: "", referenceRange: "Clear" },
    { parameter: "Pus Cells", dbField: "pusCells", unit: "/hpf", referenceRange: "0-5" },
    { parameter: "Red Blood Cells", dbField: "redBloodCells", unit: "/hpf", referenceRange: "0-2" },
    { parameter: "Epithelial Cells", dbField: "epithelialCells", unit: "/hpf", referenceRange: "Few" },
    { parameter: "Casts", dbField: "casts", unit: "/lpf", referenceRange: "Nil" },
    { parameter: "Crystals", dbField: "crystals", unit: "", referenceRange: "Nil" },
    { parameter: "Bacteria", dbField: "bacteria", unit: "", referenceRange: "Nil" },
    { parameter: "Ova", dbField: "ova", unit: "", referenceRange: "Not Seen" },
    { parameter: "Cysts", dbField: "cysts", unit: "", referenceRange: "Not Seen" },
    { parameter: "Mucus", dbField: "mucus", unit: "", referenceRange: "Nil" },
    { parameter: "Occult Blood", dbField: "occultBlood", unit: "", referenceRange: "Negative" },
  ],
};