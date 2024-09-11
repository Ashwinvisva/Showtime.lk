import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import crypto from 'crypto';


dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

const generateID = async () => {
  const latest = await User.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'USR001';

  const latestID = parseInt(latest.id.replace('USR', ''));
  const newID = 'USR' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const UserController = {
  createUser: async (req, res) => {
    try {
      const user = new User(req.body);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      user.password = hashedPassword;
      user.id = await generateID();

      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  registerUser: async (req, res) => {
    try {
      const user = new User(req.body);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      user.password = hashedPassword;
      user.type = "user";
      user.id = await generateID();

      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) res.status(404).json({ message: "User not found" });
      else res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Authentication failed. User not found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.status(200).json({ message: "User logged in successfully", user });
      } else {
        res.status(401).json({ message: "Authentication failed. Wrong password." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const resetToken = crypto.randomBytes(20).toString("hex"); // Corrected token generation
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000;
  
      await user.save();
  
      const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
      await transporter.sendMail({
        to: user.email,
        subject: "Password Reset",
        html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/><br/>Please click on the following link, or paste this into your browser to complete the process:<br/><br/><a href="${resetURL}">${resetURL}</a><br/><br/>If you did not request this, please ignore this email and your password will remain unchanged.<br/>`,
      });
  
      res.status(200).json({ message: "Password reset email sent. Check your inbox." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

      if (!user) {
        return res.status(404).json({ message: "Password reset token is invalid or has expired." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      await transporter.sendMail({
        to: user.email,
        subject: "Password Reset Successful",
        html: "Your password has been successfully reset.",
      });

      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UserController;
