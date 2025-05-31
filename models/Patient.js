import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    // Basic patient info
    patientName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Patient name must be at least 2 characters long"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, "Mobile number must be at least 10 characters long"],
    },
    age: {
      type: Number,
      required: true,
      min: [1, "Age must be at least 1"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    done: { type: Boolean, default: false },

    // Optional fields
    collectedBy: {
      type: String,
      minlength: [2, "Collected by must be at least 2 characters long"],
    },
    refBy: {
      type: String,
      minlength: [2, "Referred by must be at least 2 characters long"],
    },
    address: {
      type: String,
      minlength: [5, "Address must be at least 5 characters long"],
    },

    // Tests array with pricing
    tests: [
      {
        testName: {
          type: String,
          required: true,
          minlength: [2, "Test name must be at least 2 characters long"],
        },
        testCode: {
          type: String,
          required: true,
          minlength: [2, "Test code must be at least 2 characters long"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
          default: 0,
        },
        status: {
          type: String,
          enum: ["Pending", "Completed"],
          default: "Pending",
        },
        result: {
          type: String,
          minlength: [1, "Result must be at least 1 character long"],
        },
      },
    ],

    // Total price for all tests
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true, // Auto createdAt & updatedAt
  }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);