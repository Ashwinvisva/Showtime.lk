import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  name: String,
  type: String,
  phoneNumber: String,
  address: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default User;
