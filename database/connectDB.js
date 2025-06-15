import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb+srv://developeranas738:dfebHNv9CWYfw9as@cluster0.mhrmzux.mongodb.net/lims?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB Connected 😊: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    // process.exit(1);
  }
};

export default connectDB;
