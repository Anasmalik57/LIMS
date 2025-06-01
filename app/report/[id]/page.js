"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPrint, FaDownload, FaArrowLeft } from "react-icons/fa";

// Define a mapping for test parameters and their display format
const TEST_PARAMETERS = {
  CBC001: [
    { parameter: "HAEMOGLOBIN", unit: "mg/dl", referenceRange: "13-18" },
    { parameter: "Total R.B.C.", unit: "mil/cumm", referenceRange: "4.5-6.2" },
    { parameter: "Total W.B.C.", unit: "/cumm", referenceRange: "4000-11000" },
    { parameter: "DIFFERENTIAL COUNT", unit: "", referenceRange: "" },
    { parameter: "Lymphocytes", unit: "%", referenceRange: "20-45" },
    { parameter: "Eosinophils", unit: "%", referenceRange: "1-6" },
    { parameter: "Monocytes", unit: "%", referenceRange: "2-8" },
    { parameter: "Basophils", unit: "%", referenceRange: "0-1" },
    {
      parameter: "PLATELET COUNT",
      unit: "Lakhs/cmm",
      referenceRange: "1.5-4.5",
    },
    { parameter: "H.C.T.", unit: "%", referenceRange: "45-52" },
    { parameter: "M.C.V.", unit: "fl", referenceRange: "84-96" },
    { parameter: "M.C.H.", unit: "pg", referenceRange: "27-32" },
    { parameter: "M.C.H.C.", unit: "g/dl", referenceRange: "30-36" },
    { parameter: "R.D.W.", unit: "%", referenceRange: "10.0-15.0" },
    { parameter: "M.P.V.", unit: "", referenceRange: "6.5-11.0" },
  ],
  WID001: [
    {
      parameter: "Salmonella typhi - O",
      unit: "",
      referenceRange: "1:80 or More Significant Titre 1:80 or More",
    },
    {
      parameter: "Salmonella Typhi - H",
      unit: "",
      referenceRange: "1:80 or More Significant Titre 1:80 or More",
    },
    { parameter: "Widal Conclusion", unit: "", referenceRange: "" },
  ],
  // Add more test mappings here based on your list of tests
};

const ReportPage = () => {
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
        const data = await response.json();

        if (data.success) {
          setReport(data.report);
        } else {
          setError(data.message);
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
          <div className="border-b border-gray-300 p-6 bg-gradient-to-tl from-blue-300 via-blue-300 to-blue-400">
            <div className="flex items-start justify-between">
              {/* Lab Logo and Info */}
              <div className="flex items-center gap-4  w-full px-2 justify-around">
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
                <div>
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    Shekhpura Roorkee, Haridwar (U.K)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Ph no 9084648712, 9084648712
                  </p>
                  <p className="text-gray-700 text-sm">
                    Email: imrantyagi01@gmail.com
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
              HAEMATOLOGY REPORT
            </h2>

            {/* Test Results Table */}
            <div className="space-y-6">
              {report.tests.map((test, index) => (
                <div key={index} className="mb-8">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">
                    {test.testName.toUpperCase()}
                  </h3>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium text-gray-700">Parameter</div>
                    <div className="font-medium text-gray-700">Result</div>
                    <div className="font-medium text-gray-700">Unit</div>
                    <div className="font-medium text-gray-700">
                      Reference Range
                    </div>
                  </div>

                  <hr className="my-2 border-gray-300" />

                  {/* Dynamic rendering of test parameters */}
                  {TEST_PARAMETERS[test.testCode] ? (
                    TEST_PARAMETERS[test.testCode].map((param, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-4 gap-4 text-sm py-1"
                      >
                        <div className="text-gray-700">{param.parameter}</div>
                        <div className="text-gray-800 font-medium">
                          {test.result && test.result[param.parameter]
                            ? test.result[param.parameter]
                            : "N/A"}
                        </div>
                        <div className="text-gray-700">{param.unit}</div>
                        <div className="text-gray-700">
                          {param.referenceRange}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="grid grid-cols-4 gap-4 text-sm py-1">
                      <div className="text-gray-700">{test.testName}</div>
                      <div className="text-gray-800 font-medium">
                        {test.result || "Normal"}
                      </div>
                      <div className="text-gray-700">-</div>
                      <div className="text-gray-700">Normal Range</div>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Status:</strong> {test.status} |
                      <strong> Price:</strong> ₹{test.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-blue-700">
                  ₹{report.totalPrice}
                </span>
              </div>
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

export default ReportPage;
