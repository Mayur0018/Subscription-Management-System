import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is Reuired"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is Reuired"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [, "Please Fil a valid Email address"],
    },
    password: {
      type: String,
      required: [true, "User Password is Required"],
      minLength: 6,
    },
  },
  { timeseries: true }
);

const User = mongoose.model("User",userSchema);


export default User;