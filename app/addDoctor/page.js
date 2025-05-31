"use client";
import { addDoctor } from "@/actions/useractions";
import { commissionOptions, degreeOptions } from "@/components/DoctorData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaDollarSign,
  FaPlus,
  FaCheck,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

const AddDoctor = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    commission: "",
  });

  const [dropdownStates, setDropdownStates] = useState({
    degree: false,
    commission: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownStates({ degree: false, commission: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Input changed: ${name} = ${value}`);
  };

  const toggleDropdown = (key) => {
    setDropdownStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    console.log(`Dropdown toggled: ${key} = ${!dropdownStates[key]}`);
  };

  const selectOption = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setDropdownStates((prev) => ({ ...prev, [key]: false }));
    console.log(`Option selected: ${key} = ${value}`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || formData.name.length < 2) {
        alert("Doctor name must be at least 2 characters long");
        setIsSubmitting(false);
        return;
      }

      if (!formData.degree || formData.degree.length < 2) {
        alert("Degree must be at least 2 characters long");
        setIsSubmitting(false);
        return;
      }

      if (!formData.commission || parseFloat(formData.commission) < 0) {
        alert("Commission must be a positive number");
        setIsSubmitting(false);
        return;
      }

      // Call the server action with correct function name
      const result = await addDoctor(formData);

      if (result.success) {
        // Reset form after successful submission
        setFormData({
          name: "",
          degree: "",
          commission: "",
        });
        alert("Doctor added successfully!");
      } else {
        alert(result.message || "Error adding doctor");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", degree: "", commission: "" });
    setDropdownStates({ degree: false, commission: false });
    console.log("Form reset");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full pt-24 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-2xl">
            <FaUserMd className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Add New Doctor
          </h1>
          <p className="text-slate-300 text-lg">
            Create a new doctor profile with premium details
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-visible">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative dropdown-container">
              <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                Doctor Name *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUserMd className="text-white text-xs" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength="2"
                  placeholder="Enter doctor name (min 2 chars)"
                  className="w-full pl-14 pr-4 py-4 bg-white/5 border-2 border-white/20 hover:border-white/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Degree Field */}
            <div className="relative dropdown-container">
              <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                Medical Degree *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="text-white text-xs" />
                </div>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  minLength="2"
                  placeholder="Select or enter degree (min 2 chars)"
                  className="w-full pl-14 pr-12 py-4 bg-white/5 border-2 border-white/20 hover:border-white/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => toggleDropdown("degree")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <FaChevronDown
                    className={`transform transition-transform duration-200 ${
                      dropdownStates.degree ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownStates.degree && (
                  <div className="absolute z-[9999] w-full mt-2 bg-slate-800 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 max-h-60 overflow-y-auto">
                    {degreeOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption("degree", option)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Commission Field */}
            <div className="relative dropdown-container">
              <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
                Commission Rate (%) *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <FaDollarSign className="text-white text-xs" />
                </div>
                <input
                  type="number"
                  name="commission"
                  value={formData.commission}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="Select or enter commission"
                  className="w-full pl-14 pr-12 py-4 bg-white/5 border-2 border-white/20 hover:border-white/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => toggleDropdown("commission")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <FaChevronDown
                    className={`transform transition-transform duration-200 ${
                      dropdownStates.commission ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownStates.commission && (
                  <div className="absolute z-[9999] w-full mt-2 bg-slate-800 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 max-h-60 overflow-y-auto">
                    {commissionOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption("commission", option)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
                        {option}%
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-4 px-6 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-slate-600"
              >
                <FaTimes />
                Reset Form
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-purple-500/50 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Adding Doctor...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add Doctor
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Premium healthcare management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
