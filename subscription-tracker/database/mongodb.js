import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if (!DB_URL) {
  throw new Error(
    "Plse define the MONGODB_URL enviroment variables inside .env<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to databse in ${NODE_ENV} mode`);
    
  } catch (error) {
    console.error("Error connectiong to Database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
