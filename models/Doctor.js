import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    // Basic doctor info
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Doctor name must be at least 2 characters long"],
    },
    degree: {
      type: String,
      required: true,
      minlength: [2, "Degree must be at least 2 characters long"],
    },
    commission: {
      type: Number,
      required: true,
      min: [0, "Commission must be a positive number"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
