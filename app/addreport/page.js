"use client";
import { addreport } from "@/actions/useractions";
import Navbar from "@/components/Navbar";
import { testData } from "@/components/TestsData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaUserMd,
  FaMapMarkerAlt,
  FaFlask,
  FaPlus,
  FaTrash,
  FaSave,
  FaUserInjured,
  FaPhoneAlt,
  FaRupeeSign,
  FaChevronDown,
} from "react-icons/fa";

const AddReport = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  const [formData, setFormData] = useState({
    patientName: "",
    mobile: "",
    age: "",
    gender: "",
    collectedBy: "",
    refBy: "",
    address: "",
    tests: [
      { testName: "", testCode: "", price: 0, status: "Pending", result: "" },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Input changed: ${name} = ${value}`);
  };

  const handleTestChange = (index, field, value) => {
    const updatedTests = formData.tests.map((test, i) =>
      i === index ? { ...test, [field]: value } : test
    );
    setFormData((prev) => ({ ...prev, tests: updatedTests }));
    console.log(`Test changed: ${field} = ${value}`);
  };

  const handleTestSelection = (index, selectedTest) => {
    const updatedTests = formData.tests.map((test, i) =>
      i === index
        ? {
            ...test,
            testName: selectedTest.name,
            testCode: selectedTest.code,
            price: selectedTest.price,
          }
        : test
    );
    setFormData((prev) => ({ ...prev, tests: updatedTests }));
    setDropdownOpen((prev) => ({ ...prev, [index]: false }));
    console.log(`Test selected: ${selectedTest.name} at index ${index}`);
    console.log(
      `Test code: ${selectedTest.code}, Price: ₹${selectedTest.price}`
    );
  };

  const addTest = () => {
    setFormData((prev) => ({
      ...prev,
      tests: [
        ...prev.tests,
        { testName: "", testCode: "", price: 0, status: "Pending", result: "" },
      ],
    }));
  };

  const removeTest = (index) => {
    if (formData.tests.length > 1) {
      const updatedTests = formData.tests.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, tests: updatedTests }));
    }
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getTotalPrice = () => {
    return formData.tests.reduce((total, test) => total + (test.price || 0), 0);
  };

// Updated handleSubmit function in AddReport component
const handleSubmit = async () => {
  setIsSubmitting(true);

  try {
    // Validate that all tests have required fields
    const invalidTests = formData.tests.filter(
      (test) => !test.testName || !test.testCode || test.price <= 0
    );

    if (invalidTests.length > 0) {
      alert(
        "Please select valid tests for all test entries and ensure prices are greater than 0"
      );
      setIsSubmitting(false);
      return;
    }

    // Validate required patient fields
    if (
      !formData.patientName ||
      !formData.mobile ||
      !formData.age ||
      !formData.gender
    ) {
      alert("Please fill in all required patient information");
      setIsSubmitting(false);
      return;
    }

    // Calculate total price to send to the server
    const totalPrice = getTotalPrice();

    // Prepare the formData to include totalPrice
    const dataToSubmit = {
      ...formData,
      totalPrice, // Add totalPrice to the data being sent
    };

    // Debug: Log the data being sent
    console.log(
      "Form data being submitted:",
      JSON.stringify(dataToSubmit, null, 2)
    );
    console.log("Total price calculated:", totalPrice);
    
    // Call the server action
    const result = await addreport(dataToSubmit);

    if (result.success) {
      // Reset form after successful submission
      setFormData({
        patientName: "",
        mobile: "",
        age: "",
        gender: "",
        collectedBy: "",
        refBy: "",
        address: "",
        tests: [
          {
            testName: "",
            testCode: "",
            price: 0,
            status: "Pending",
            result: "",
          },
        ],
      });
      
      // Show success message
      alert("Report added successfully!");
      
      // Redirect to the report page with the new report ID
      if (result.reportId) {
        router.push(`/report/${result.reportId}`);
      }
    } else {
      alert(result.message || "Error adding report");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error adding report. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <FaUserInjured className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold  mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Add Patient Report
          </h1>
          <p className="text-slate-300 text-lg">
            Create a comprehensive patient record with test details
          </p>
        </div>

        {/* Main Form */}
        <div className="space-y-8">
          {/* Basic Patient Information */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <FaUser className="text-blue-400" />
              Patient Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Patient Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Patient Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    minLength="2"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient name (min 2 chars)"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Mobile Number *
                </label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    minLength="10"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                     placeholder="Enter mobile number (min 10 digits)"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Age *
                </label>
                <div className="relative">
                  <FaBirthdayCake className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="150"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter age (min 1)"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Gender *
                </label>
                <div className="relative">
                  <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-slate-800">
                      Select gender
                    </option>
                    <option value="Male" className="bg-slate-800">
                      Male
                    </option>
                    <option value="Female" className="bg-slate-800">
                      Female
                    </option>
                    <option value="Other" className="bg-slate-800">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Collected By */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Collected By
                </label>
                <div className="relative">
                  <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="collectedBy"
                    value={formData.collectedBy}
                    onChange={handleInputChange}
                    minLength="2"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter collector name (min 2 chars)"
                  />
                </div>
              </div>

              {/* Referred By */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Referred By
                </label>
                <div className="relative">
                  <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="refBy"
                    value={formData.refBy}
                    onChange={handleInputChange}
                    minLength="2"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter referrer name (min 2 chars)"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Address
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  minLength="5"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Enter patient address (min 5 chars)"
                />
              </div>
            </div>
          </div>

          {/* Tests Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                <FaFlask className="text-green-400" />
                Test Details
              </h2>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-xl text-white font-semibold shadow-lg">
                  <FaRupeeSign className="inline mr-1" />
                  Total: ₹{getTotalPrice()}
                </div>
                <button
                  type="button"
                  onClick={addTest}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaPlus className="text-sm" />
                  Add Test
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {formData.tests.map((test, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">
                      Test #{index + 1}
                    </h3>
                    {formData.tests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTest(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Test Name Dropdown */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Test Name *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(index)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 flex items-center justify-between"
                        >
                          <span
                            className={
                              test.testName ? "text-white" : "text-slate-400"
                            }
                          >
                            {test.testName || "Select a test"}
                          </span>
                          <FaChevronDown
                            className={`transition-transform duration-200 ${
                              dropdownOpen[index] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {dropdownOpen[index] && (
                          <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                            {testData.map((testOption, testIndex) => (
                              <button
                                key={testIndex}
                                type="button"
                                onClick={() =>
                                  handleTestSelection(index, testOption)
                                }
                                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 text-white border-b border-white/10 last:border-b-0"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-medium">
                                      {testOption.name}
                                    </div>
                                    <div className="text-sm text-slate-400">
                                      {testOption.code}
                                    </div>
                                  </div>
                                  <div className="text-green-400 font-semibold">
                                    ₹{testOption.price}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Test Code */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Test Code
                      </label>
                      <input
                        type="text"
                        value={test.testCode}
                        readOnly
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-slate-300 cursor-not-allowed transition-all duration-300"
                        placeholder="Auto-filled from selection"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Price (₹)
                      </label>
                      <div className="relative">
                        <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          value={test.price}
                          onChange={(e) =>
                            handleTestChange(
                              index,
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          min="0"
                          disabled={!test.testName}
                          className={`w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                            !test.testName
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder={
                            test.testName ? "Enter price" : "Select test first"
                          }
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Status
                      </label>
                      <select
                        value={test.status}
                        onChange={(e) =>
                          handleTestChange(index, "status", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="Pending" className="bg-slate-800">
                          Pending
                        </option>
                        <option value="Completed" className="bg-slate-800">
                          Completed
                        </option>
                      </select>
                    </div>

                    {/* Result */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Result
                      </label>
                      <input
                        type="text"
                        value={test.result}
                        onChange={(e) =>
                          handleTestChange(index, "result", e.target.value)
                        }
                        minLength="1"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter test result (min 1 char)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Adding Report...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Patient Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddReport;