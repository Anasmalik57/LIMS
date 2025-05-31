"use server";
import connectDB from "@/database/connectDB";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";

// Function to add a new report

export const addreport = async (formData) => {
  try {
    // Ensure DB connection first
    await connectDB();

    const {
      patientName,
      mobile,
      age,
      gender,
      collectedBy,
      refBy,
      address,
      tests,
    } = formData;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ mobile });

    if (existingPatient) {
      return {
        success: false,
        message: "Report already exists for this mobile number",
      };
    }

    // Create new patient
    const newPatient = new Patient({
      patientName,
      mobile,
      age,
      gender,
      collectedBy: collectedBy || undefined,
      refBy: refBy || undefined,
      address: address || undefined,
      tests,
    });

    await newPatient.save();

    return { success: true, message: "Report added successfully" };
  } catch (error) {
    console.error("Error adding report:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};
// Function to add a new doctor
export const addDoctor = async (doctorFormData) => {
  try {
    await connectDB();
    const { name, degree, commission } = doctorFormData;

    // Check if a doctor with the same name already exists
    const existingDoctor = await Doctor.findOne({ name });
    console.log(`Existing Doctor: ${existingDoctor}`);
    
    // If doctor already exists, return error
    if (existingDoctor) {
      return {
        success: false,
        message: "Doctor with this name already exists",
      };
    }
    
    // Create new doctor
    const newDoctor = new Doctor({
      name,
      degree,
      commission: commission || undefined,
    });
    await newDoctor.save();

    return { success: true, message: "Doctor added successfully" };
  } catch (error) {
    console.error("Error adding doctor:", error); // Fixed error message
    return { success: false, message: error.message || "Something went wrong" };
  }
};