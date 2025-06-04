"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaPrint, FaDownload, FaArrowLeft, FaEdit } from "react-icons/fa";

// Define test codes and their categories
const HEMATOLOGY_TEST_CODES = ["CBC001", "ESR023", "HGB136", "BLG019", "PRT020", "AEC150", "HBA004", "BTC132", "GBP147"];
const BIOCHEMISTRY_TEST_CODES = ["BCM001"];
const SEROLOGY_TEST_CODES = ["WID001"];
const MICROSCOPY_TEST_CODES = ["MCP001"];

// CBC Parameters with reference ranges
const CBC_PARAMETERS = [
  { key: "hemoglobin", parameter: "HAEMOGLOBIN", unit: "mg/dl", referenceRange: "13-18" },
  { key: "totalRBC", parameter: "Total R.B.C.", unit: "mil/cumm", referenceRange: "4.5-6.2" },
  { key: "totalWBC", parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-11000" },
  { key: "separator", parameter: "DIFFERENTIAL COUNT", unit: "", referenceRange: "" },
  { key: "polymorphs", parameter: "Polymorphs", unit: "%", referenceRange: "20-45" },
  { key: "lymphocytes", parameter: "Lymphocytes", unit: "%", referenceRange: "20-45" },
  { key: "eosinophils", parameter: "Eosinophils", unit: "%", referenceRange: "1-6" },
  { key: "monocytes", parameter: "Monocytes", unit: "%", referenceRange: "2-8" },
  { key: "basophils", parameter: "Basophils", unit: "%", referenceRange: "0-1" },
  { key: "plateletCount", parameter: "PLATELET COUNT", unit: "Lakhs/cmm", referenceRange: "1.5-4.5" },
  { key: "hct", parameter: "H.C.T.", unit: "%", referenceRange: "45-52" },
  { key: "mcv", parameter: "M.C.V.", unit: "fl", referenceRange: "84-96" },
  { key: "mch", parameter: "M.C.H.", unit: "pg", referenceRange: "27-32" },
  { key: "mchc", parameter: "M.C.H.C.", unit: "g/dl", referenceRange: "30-36" },
  { key: "rdw", parameter: "R.D.W.", unit: "%", referenceRange: "10.0-15.0" },
  { key: "mpv", parameter: "M.P.V.", unit: "", referenceRange: "6.5-11.0" },
];

// Widal Parameters
const WIDAL_PARAMETERS = [
  {
    key: "salmonellaO",
    parameter: "Salmonella typhi - O",
    unit: "",
    referenceRange: "1:80 or More Significant Titre 1:80 or More",
  },
  {
    key: "salmonellaH",
    parameter: "Salmonella Typhi - H",
    unit: "",
    referenceRange: "1:80 or More Significant Titre 1:80 or More",
  },
  {
    key: "widalConclusion",
    parameter: "Widal Conclusion",
    unit: "",
    referenceRange: "",
  },
];

// Biochemistry Parameters
const BIOCHEMISTRY_PARAMETERS = [
  { key: "separator", parameter: "LIVER FUNCTION TESTS", unit: "", referenceRange: "" },
  { key: "totalBilirubin", parameter: "Total Bilirubin", unit: "mg/dl", referenceRange: "0.2-1.2" },
  { key: "directBilirubin", parameter: "Direct Bilirubin", unit: "mg/dl", referenceRange: "0.0-0.3" },
  { key: "indirectBilirubin", parameter: "Indirect Bilirubin", unit: "mg/dl", referenceRange: "0.2-0.9" },
  { key: "sgot", parameter: "SGOT (AST)", unit: "U/L", referenceRange: "8-40" },
  { key: "sgpt", parameter: "SGPT (ALT)", unit: "U/L", referenceRange: "7-56" },
  { key: "alkalinePhosphatase", parameter: "Alkaline Phosphatase", unit: "U/L", referenceRange: "44-147" },
  { key: "separator", parameter: "KIDNEY FUNCTION TESTS", unit: "", referenceRange: "" },
  { key: "bloodUrea", parameter: "Blood Urea", unit: "mg/dl", referenceRange: "15-40" },
  { key: "serumCreatinine", parameter: "Serum Creatinine", unit: "mg/dl", referenceRange: "0.7-1.3" },
  { key: "serumUricAcid", parameter: "Serum Uric Acid", unit: "mg/dl", referenceRange: "3.4-7.0" },
  { key: "separator", parameter: "LIPID PROFILE", unit: "", referenceRange: "" },
  { key: "totalCholesterol", parameter: "Total Cholesterol", unit: "mg/dl", referenceRange: "<200" },
  { key: "triglycerides", parameter: "Triglycerides", unit: "mg/dl", referenceRange: "<150" },
  { key: "hdlCholesterol", parameter: "HDL Cholesterol", unit: "mg/dl", referenceRange: ">40" },
  { key: "ldlCholesterol", parameter: "LDL Cholesterol", unit: "mg/dl", referenceRange: "<100" },
  { key: "separator", parameter: "BLOOD SUGAR", unit: "", referenceRange: "" },
  { key: "fastingGlucose", parameter: "Fasting Glucose", unit: "mg/dl", referenceRange: "70-100" },
  { key: "randomGlucose", parameter: "Random Glucose", unit: "mg/dl", referenceRange: "70-140" },
];

// Microscopy Parameters
const MICROSCOPY_PARAMETERS = [
  { key: "separator", parameter: "URINE MICROSCOPY", unit: "", referenceRange: "" },
  { key: "urineColor", parameter: "Color", unit: "", referenceRange: "Pale Yellow" },
  { key: "urineAppearance", parameter: "Appearance", unit: "", referenceRange: "Clear" },
  { key: "pusCells", parameter: "Pus Cells", unit: "/hpf", referenceRange: "0-5" },
  { key: "urineRBC", parameter: "Red Blood Cells", unit: "/hpf", referenceRange: "0-2" },
  { key: "epithelialCells", parameter: "Epithelial Cells", unit: "/hpf", referenceRange: "Few" },
  { key: "casts", parameter: "Casts", unit: "", referenceRange: "Nil" },
  { key: "crystals", parameter: "Crystals", unit: "", referenceRange: "Nil" },
  { key: "bacteria", parameter: "Bacteria", unit: "", referenceRange: "Nil" },
  { key: "separator", parameter: "STOOL MICROSCOPY", unit: "", referenceRange: "" },
  { key: "ova", parameter: "Ova", unit: "", referenceRange: "Not Seen" },
  { key: "cysts", parameter: "Cysts", unit: "", referenceRange: "Not Seen" },
  { key: "mucus", parameter: "Mucus", unit: "", referenceRange: "Nil" },
  { key: "occultBlood", parameter: "Occult Blood", unit: "", referenceRange: "Negative" },
];

const ReportPDF = () => {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/report/${params.id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.success) {
          setReport(data.report);
        } else {
          setError(data.message || "Failed to fetch report");
        }
      } catch (err) {
        setError("Failed to fetch report");
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Function to determine report heading based on test codes
  const getReportHeading = () => {
    if (!report || !report.tests) return "LABORATORY REPORT";
    
    const testCodes = report.tests.map(test => test.testCode);
    const hasHematologyTest = testCodes.some(code => HEMATOLOGY_TEST_CODES.includes(code));
    const hasBiochemistryTest = testCodes.some(code => BIOCHEMISTRY_TEST_CODES.includes(code));
    const hasSerologyTest = testCodes.some(code => SEROLOGY_TEST_CODES.includes(code));
    const hasMicroscopyTest = testCodes.some(code => MICROSCOPY_TEST_CODES.includes(code));
    
    if (hasHematologyTest) return "HAEMATOLOGY REPORT";
    if (hasBiochemistryTest) return "BIOCHEMISTRY REPORT";
    if (hasSerologyTest) return "SEROLOGY REPORT";
    if (hasMicroscopyTest) return "MICROSCOPY REPORT";
    
    return "LABORATORY REPORT";
  };

  // Generic function to render test results
  const renderTestResults = (testCode, testName, parameters, testData) => {
    if (!testData) return null;

    return (
      <div className="mb-8">
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
                <div className="text-gray-800 font-semibold">{param.parameter}</div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            );
          }

          const value = testData[param.key];
          const displayValue = value && value.trim() !== "" ? value : "N/A";

          return (
            <div key={idx} className="grid grid-cols-4 gap-4 text-sm py-1">
              <div className="text-gray-700">{param.parameter}</div>
              <div className="text-gray-800 font-medium">
                {displayValue}
              </div>
              <div className="text-gray-700">{param.unit}</div>
              <div className="text-gray-700">{param.referenceRange}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Function to render CBC test results
  const renderCBCResults = () => {
    const cbcTest = report.tests.find(test => test.testCode === "CBC001");
    if (!cbcTest) return null;

    const cbcData = report.testResults?.cbc001;
    return renderTestResults("CBC001", "COMPLETE BLOOD COUNT (CBC)", CBC_PARAMETERS, cbcData);
  };

  // Function to render Widal test results
  const renderWidalResults = () => {
    const widalTest = report.tests.find(test => test.testCode === "WID001");
    if (!widalTest) return null;

    const widalData = report.testResults?.wid001;
    return renderTestResults("WID001", "WIDAL TEST", WIDAL_PARAMETERS, widalData);
  };

  // Function to render Biochemistry test results
  const renderBiochemistryResults = () => {
    const biochemTest = report.tests.find(test => test.testCode === "BCM001");
    if (!biochemTest) return null;

    const biochemData = report.testResults?.bcm001;
    return renderTestResults("BCM001", "BIOCHEMISTRY REPORT", BIOCHEMISTRY_PARAMETERS, biochemData);
  };

  // Function to render Microscopy test results
  const renderMicroscopyResults = () => {
    const microscopyTest = report.tests.find(test => test.testCode === "MCP001");
    if (!microscopyTest) return null;

    const microscopyData = report.testResults?.mcp001;
    return renderTestResults("MCP001", "MICROSCOPY REPORT", MICROSCOPY_PARAMETERS, microscopyData);
  };

  // Function to render other test results (for tests not specifically handled)
  const renderOtherTestResults = () => {
    if (!report.tests || report.tests.length === 0) return null;

    const handledTestCodes = ["CBC001", "WID001", "BCM001", "MCP001"];
    const otherTests = report.tests.filter(test => 
      !handledTestCodes.includes(test.testCode)
    );

    if (otherTests.length === 0) return null;

    return otherTests.map((test, index) => (
      <div key={index} className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">
          {test.testName.toUpperCase()}
        </h3>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="font-medium text-gray-700">Parameter</div>
          <div className="font-medium text-gray-700">Result</div>
          <div className="font-medium text-gray-700">Unit</div>
          <div className="font-medium text-gray-700">Reference Range</div>
        </div>

        <hr className="my-2 border-gray-300" />

        <div className="grid grid-cols-4 gap-4 text-sm py-1">
          <div className="text-gray-700">{test.testName}</div>
          <div className="text-gray-800 font-medium">
            {test.result && test.result.trim() !== "" ? test.result : "Normal"}
          </div>
          <div className="text-gray-700">-</div>
          <div className="text-gray-700">Normal Range</div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> {test.status}
          </p>
        </div>
      </div>
    ));
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Report Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested report could not be found.
          </p>
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
    <div className="min-h-screen bg-gray-100 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto print:mt-0">
        {/* Header Actions - Hidden in print */}
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

        {/* Report Container */}
        <div className="bg-white shadow-lg border border-gray-300 print:shadow-none print:border-0">
          {/* Header Section */}
          <div className="border-b border-gray-300 p-6 px-0 bg-gradient-to-tl from-blue-300 via-blue-300 to-blue-400">
            <div className="flex items-start justify-between">
              {/* Lab Logo and Info */}
              <div className="flex items-center gap-4 w-full px-2 justify-between">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-500">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🏥</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 border-2 rounded-sm border-gray-800 px-4 py-1 print:text-2xl">
                    GLOBAL PATHOLOGY LAB
                  </h1>
                </div>
                <div className="*:font-semibold">
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    Shekhpura Roorkee, Haridwar (U.K)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Phone: 9927782011, 9084648712
                  </p>
                  <p className="text-gray-700 text-xs">
                    Email: imrantyagi201@gmail.com, javadmalik379@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="p-6 border-b border-gray-300">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Collected by
                  </span>
                  <span className="text-gray-700">
                    : {report.collectedBy || "Main Branch"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Patient's Name
                  </span>
                  <span className="text-gray-700">
                    : <strong>{report.patientName.toUpperCase()}</strong>
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Age / Gender
                  </span>
                  <span className="text-gray-700">
                    : {report.age} Yrs, {report.gender}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Ref. By
                  </span>
                  <span className="text-gray-700">
                    : {report.refBy || "Self"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">UHID</span>
                  <span className="text-gray-700">: {report.mobile}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Reg. No.
                  </span>
                  <span className="text-gray-700">
                    : {report._id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Patient ID
                  </span>
                  <span className="text-gray-700">
                    : {formatDate(report.createdAt).replace(/\//g, "")}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Collection Date
                  </span>
                  <span className="text-gray-700">
                    : {formatDate(report.createdAt)}{" "}
                    {formatTime(report.createdAt)}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Received Date
                  </span>
                  <span className="text-gray-700">
                    : {formatDate(report.createdAt)}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-700 font-medium">
                    Reporting Date
                  </span>
                  <span className="text-gray-700">
                    : {formatDate(report.createdAt)}{" "}
                    {formatTime(report.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation List */}
          <div className="p-6 py-2 border-b border-gray-300">
            <div className="flex">
              <span className="w-32 text-gray-700 font-medium">
                Investigations
              </span>
              <span className="text-gray-700">
                : {report.tests.map((test) => test.testCode).join(", ")}
              </span>
            </div>
          </div>

          {/* Report Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-green-700 mb-6 underline">
              {getReportHeading()}
            </h2>

            {/* Test Results */}
            <div className="space-y-6">
              {/* Render CBC results if available */}
              {renderCBCResults()}
              
              {/* Render Widal results if available */}
              {renderWidalResults()}
              
              {/* Render Biochemistry results if available */}
              {renderBiochemistryResults()}
              
              {/* Render Microscopy results if available */}
              {renderMicroscopyResults()}
              
              {/* Render other test results */}
              {renderOtherTestResults()}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-2">
                *** End of Report ***
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="p-6 border-t border-gray-300">
            <div className="flex justify-between items-end">
              <div className="text-center">
                <div className="w-32 h-16 border-b border-gray-400 mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">
                  DR AZAM TYAGI
                </p>
                <p className="text-xs text-gray-600">M.D PATHOLOGIST 66154</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-16 border-b border-gray-400 mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">
                  M.TYAGI (B.M.L.T)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPDF;