import mongoose from "mongoose";

const connectDB = async () => {
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGODB_URI_TEST
      : process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected [${process.env.NODE_ENV || "development"}]`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
