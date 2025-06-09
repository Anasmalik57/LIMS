import mongoose from "mongoose";

// Clear existing model cache to force re-registration
if (mongoose.models.GeneratedBill) {
  delete mongoose.models.GeneratedBill;
}

const GeneratedBillSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    tests: [
      {
        testName: { type: String, required: true },
        testCode: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    rupeesDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    percentDiscount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "generated_bills",
  }
);

// Indexes for better performance
GeneratedBillSchema.index({ patientId: 1 });
GeneratedBillSchema.index({ generatedAt: -1 });

// Force model re-registration
const GeneratedBill = mongoose.model("GeneratedBill", GeneratedBillSchema);

export default GeneratedBill;