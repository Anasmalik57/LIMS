"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";

// Define test parameters mapping with units and reference ranges
const TEST_PARAMETERS = {
  CBC001: [
    {
      parameter: "HAEMOGLOBIN",
      dbField: "hemoglobin",
      unit: "mg/dl",
      referenceRange: "13-18",
    },
    {
      parameter: "Total R.B.C.",
      dbField: "totalRBC",
      unit: "mil/cumm",
      referenceRange: "4.5-6.2",
    },
    {
      parameter: "Total W.B.C.",
      dbField: "totalWBC",
      unit: "/cumm",
      referenceRange: "4000-11000",
    },
    {
      parameter: "Polymorphs",
      dbField: "polymorphs",
      unit: "%",
      referenceRange: "20-45",
    },
    {
      parameter: "Lymphocytes",
      dbField: "lymphocytes",
      unit: "%",
      referenceRange: "20-45",
    },
    {
      parameter: "Eosinophils",
      dbField: "eosinophils",
      unit: "%",
      referenceRange: "1-6",
    },
    {
      parameter: "Monocytes",
      dbField: "monocytes",
      unit: "%",
      referenceRange: "2-8",
    },
    {
      parameter: "Basophils",
      dbField: "basophils",
      unit: "%",
      referenceRange: "0-1",
    },
    {
      parameter: "PLATELET COUNT",
      dbField: "plateletCount",
      unit: "Lakhs/cmm",
      referenceRange: "1.5-4.5",
    },
    { parameter: "H.C.T.", dbField: "hct", unit: "%", referenceRange: "45-52" },
    {
      parameter: "M.C.V.",
      dbField: "mcv",
      unit: "fl",
      referenceRange: "84-96",
    },
    {
      parameter: "M.C.H.",
      dbField: "mch",
      unit: "pg",
      referenceRange: "27-32",
    },
    {
      parameter: "M.C.H.C.",
      dbField: "mchc",
      unit: "g/dl",
      referenceRange: "30-36",
    },
    {
      parameter: "R.D.W.",
      dbField: "rdw",
      unit: "%",
      referenceRange: "10.0-15.0",
    },
    {
      parameter: "M.P.V.",
      dbField: "mpv",
      unit: "",
      referenceRange: "6.5-11.0",
    },
  ],
  WID001: [
    {
      parameter: "Salmonella typhi - O",
      dbField: "salmonellaO",
      unit: "",
      referenceRange: "1:80 or More Significant Titre 1:80 or More",
    },
    {
      parameter: "Salmonella Typhi - H",
      dbField: "salmonellaH",
      unit: "",
      referenceRange: "1:80 or More Significant Titre 1:80 or More",
    },
    {
      parameter: "Widal Conclusion",
      dbField: "widalConclusion",
      unit: "",
      referenceRange: "",
    },
  ],
  BCM001: [
    {
      parameter: "Total Bilirubin",
      dbField: "totalBilirubin",
      unit: "mg/dl",
      referenceRange: "0.2-1.2",
    },
    {
      parameter: "Direct Bilirubin",
      dbField: "directBilirubin",
      unit: "mg/dl",
      referenceRange: "0.0-0.3",
    },
    {
      parameter: "Indirect Bilirubin",
      dbField: "indirectBilirubin",
      unit: "mg/dl",
      referenceRange: "0.2-0.9",
    },
    {
      parameter: "SGOT (AST)",
      dbField: "sgot",
      unit: "U/L",
      referenceRange: "8-40",
    },
    {
      parameter: "SGPT (ALT)",
      dbField: "sgpt",
      unit: "U/L",
      referenceRange: "7-56",
    },
    {
      parameter: "Alkaline Phosphatase",
      dbField: "alkalinePhosphatase",
      unit: "U/L",
      referenceRange: "44-147",
    },
    {
      parameter: "Blood Urea",
      dbField: "bloodUrea",
      unit: "mg/dl",
      referenceRange: "15-40",
    },
    {
      parameter: "Serum Creatinine",
      dbField: "serumCreatinine",
      unit: "mg/dl",
      referenceRange: "0.7-1.3",
    },
    {
      parameter: "Serum Uric Acid",
      dbField: "serumUricAcid",
      unit: "mg/dl",
      referenceRange: "3.4-7.0",
    },
    {
      parameter: "Total Cholesterol",
      dbField: "totalCholesterol",
      unit: "mg/dl",
      referenceRange: "<200",
    },
    {
      parameter: "Triglycerides",
      dbField: "triglycerides",
      unit: "mg/dl",
      referenceRange: "<150",
    },
    {
      parameter: "HDL Cholesterol",
      dbField: "hdlCholesterol",
      unit: "mg/dl",
      referenceRange: ">40",
    },
    {
      parameter: "LDL Cholesterol",
      dbField: "ldlCholesterol",
      unit: "mg/dl",
      referenceRange: "<100",
    },
    {
      parameter: "Fasting Glucose",
      dbField: "fastingGlucose",
      unit: "mg/dl",
      referenceRange: "70-100",
    },
    {
      parameter: "Random Glucose",
      dbField: "randomGlucose",
      unit: "mg/dl",
      referenceRange: "70-140",
    },
  ],
  MCP001: [
    {
      parameter: "Color",
      dbField: "urineColor",
      unit: "",
      referenceRange: "Pale Yellow",
    },
    {
      parameter: "Appearance",
      dbField: "urineAppearance",
      unit: "",
      referenceRange: "Clear",
    },
    {
      parameter: "Pus Cells",
      dbField: "pusCells",
      unit: "/hpf",
      referenceRange: "0-5",
    },
    {
      parameter: "Red Blood Cells",
      dbField: "urineRBC",
      unit: "/hpf",
      referenceRange: "0-2",
    },
    {
      parameter: "Epithelial Cells",
      dbField: "epithelialCells",
      unit: "/hpf",
      referenceRange: "Few",
    },
    { parameter: "Casts", dbField: "casts", unit: "", referenceRange: "Nil" },
    {
      parameter: "Crystals",
      dbField: "crystals",
      unit: "",
      referenceRange: "Nil",
    },
    {
      parameter: "Bacteria",
      dbField: "bacteria",
      unit: "",
      referenceRange: "Nil",
    },
    { parameter: "Ova", dbField: "ova", unit: "", referenceRange: "Not Seen" },
    {
      parameter: "Cysts",
      dbField: "cysts",
      unit: "",
      referenceRange: "Not Seen",
    },
    { parameter: "Mucus", dbField: "mucus", unit: "", referenceRange: "Nil" },
    {
      parameter: "Occult Blood",
      dbField: "occultBlood",
      unit: "",
      referenceRange: "Negative",
    },
  ],
};

const EditReportComponent = () => {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ testResults: {} });
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
      tests: reportData.tests || [],
      testResults: {
        cbc001: reportData.testResults?.cbc001 || {},
        wid001: reportData.testResults?.wid001 || {},
        bcm001: reportData.testResults?.bcm001 || {},
        mcp001: reportData.testResults?.mcp001 || {},
      },
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
    if (formData.tests) {
      formData.tests.forEach((test, index) => {
        if (!test.testName || test.testName.length < 2) {
          errors[`testName_${index}`] = `Test name for test ${
            index + 1
          } must be at least 2 characters long`;
        }
        if (!test.testCode || test.testCode.length < 2) {
          errors[`testCode_${index}`] = `Test code for test ${
            index + 1
          } must be at least 2 characters long`;
        }
        if (test.price < 0) {
          errors[`price_${index}`] = `Price for test ${
            index + 1
          } cannot be negative`;
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
      const payload = { ...formData, totalPrice };

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
          {parameters.map((param, paramIndex) => (
            <div key={paramIndex}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {param.parameter}
                {param.unit && (
                  <span className="text-gray-500"> ({param.unit})</span>
                )}
              </label>
              <input
                type="text"
                value={testData[param.dbField] || ""}
                onChange={(e) =>
                  handleTestResultChange(
                    testCode,
                    param.dbField,
                    e.target.value
                  )
                }
                placeholder={param.referenceRange || "Enter value"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {param.referenceRange && (
                <p className="text-xs text-gray-500 mt-1">
                  Reference: {param.referenceRange}
                </p>
              )}
            </div>
          ))}
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
                  className="mb-6 p-4 border border-gray-200 rounded-lg"
                >
                  <h3 className="font-semibold text-gray-800 mb-3">
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
