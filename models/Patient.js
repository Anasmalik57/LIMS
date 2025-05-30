import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const PatientSchema = new Schema(
  {
    // Basic patient info
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    done: { type: Boolean, default: false },
    
    // Optional fields
    collectedBy: String,
    refBy: String,
    address: String,

    // Tests array
    tests: [
      {
        testName: { type: String, required: true },
        testCode: { type: String, required: true },
        status: {
          type: String,
          enum: ["Pending", "Completed"],
          default: "Pending",
        },
        result: String,
      },
    ],
  },
  {
    timestamps: true, // Auto createdAt & updatedAt
  }
);

export default mongoose.models.Patient || model("Patient", PatientSchema);
