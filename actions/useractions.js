"use server";
import connectDB from "@/database/connectDB";
import Patient from "@/models/Patient";

export const addreport = async (formData) => {
  try {
    // Ensure DB connection first
    const connected = await connectDB();
    if (!connected) {
      return { success: false, message: "Database connection failed" };
    }

    const { patientName, mobile, age, gender, collectedBy, refBy, address, tests, } = formData;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ mobile });
    
    if (existingPatient) {
      return { success: false, message: "Report already exists for this mobile number" };
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