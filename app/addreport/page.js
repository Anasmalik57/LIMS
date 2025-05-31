"use client";
import { addreport } from "@/actions/useractions";
import React, { useState } from "react";
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
} from "react-icons/fa";

const AddReport = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    mobile: "",
    age: "",
    gender: "",
    collectedBy: "",
    refBy: "",
    address: "",
    tests: [{ testName: "", testCode: "", status: "Pending", result: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    console.log(`Input changed: ${name} = ${value}`);
  };

  const addTest = () => {
    setFormData((prev) => ({
      ...prev,
      tests: [
        ...prev.tests,
        { testName: "", testCode: "", status: "Pending", result: "" },
      ],
    }));
  };

  const removeTest = (index) => {
    if (formData.tests.length > 1) {
      const updatedTests = formData.tests.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, tests: updatedTests }));
    }
  };

const handleSubmit = async () => {
  setIsSubmitting(true);

  try {
    // Call the server action
    const result = await addreport(formData);
    
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
        tests: [{ testName: "", testCode: "", status: "Pending", result: "" }],
      });
      alert("Report added successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <FaUserInjured className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
              <button
                type="button"
                onClick={addTest}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaPlus className="text-sm" />
                Add Test
              </button>
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
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Test Name *
                      </label>
                      <input
                        type="text"
                        value={test.testName}
                        onChange={(e) =>
                          handleTestChange(index, "testName", e.target.value)
                        }
                        required
                        minLength="2"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter test name (min 2 chars)"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        Test Code *
                      </label>
                      <input
                        type="text"
                        value={test.testCode}
                        onChange={(e) =>
                          handleTestChange(index, "testCode", e.target.value)
                        }
                        required
                        minLength="2"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter test code (min 2 chars)"
                      />
                    </div>

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

                    <div className="space-y-2">
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
  );
};

export default AddReport;
