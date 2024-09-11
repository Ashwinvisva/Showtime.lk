import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  id: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: Number,
  comment: String,
  reply: String,
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
