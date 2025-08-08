import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? '';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "selvatika_backend", 
    });
    console.log("Connected to MongoDB => ", db.connection.name);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;
