"use server";
import connectDB from "@/database/connectDB";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { sendReportNotification } from "./notification";

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
      totalPrice, // Add this line to destructure totalPrice from formData
    } = formData;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ mobile });

    if (existingPatient) {
      return {
        success: false,
        message: "Report already exists for this mobile number",
      };
    }

    // Calculate total price from tests (as backup if totalPrice is not provided)
    const calculatedTotalPrice =
      totalPrice || tests.reduce((total, test) => total + (test.price || 0), 0);

    console.log("Total price being saved:", calculatedTotalPrice); // Debug log

    // Create new patient with pricing information
    const newPatient = new Patient({
      patientName,
      mobile,
      age,
      gender,
      collectedBy: collectedBy || undefined,
      refBy: refBy || undefined,
      address: address || undefined,
      done: true,
      tests: tests.map((test) => ({
        testName: test.testName,
        testCode: test.testCode,
        price: test.price || 0, // Ensure price is saved for each test
        status: test.status || "Pending",
        // result field removed - will be added later when machine output is available
      })),
      totalPrice: calculatedTotalPrice, // Use the calculated or provided total price
    });

    const savedPatient = await newPatient.save();

    console.log("Patient saved with total price:", savedPatient.totalPrice); // Debug log
    console.log("Patient saved with ID:", savedPatient._id); // Debug log

    const emailResult = await sendReportNotification({
      patientName,
      mobile,
      age,
      gender,
      collectedBy,
      refBy,
      address,
      tests,
      totalPrice: calculatedTotalPrice,
    });

    // Log email result but don't fail report creation if email fails
    if (emailResult.success) {
      console.log("✅ Email notification sent successfully");
    } else {
      console.log("⚠️ Email notification failed:", emailResult.message);
    }

    return {
      success: true,
      message: "Report added successfully",
      reportId: savedPatient._id.toString(), // Return the report ID for redirect
      totalPrice: calculatedTotalPrice, // Return total price in response
    };
  } catch (error) {
    console.error("Error adding report:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

//////////////////////////////////////

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
    console.error("Error adding doctor:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};
