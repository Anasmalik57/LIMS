import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    default: "Admin",
    required: true
  }
});

// Index for faster queries
// UserSchema.index({ email: 1 });

export default mongoose.models.User || model("User", UserSchema);