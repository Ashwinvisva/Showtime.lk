import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  maxColumn: { type: Number, required: true },
  maxRow: { type: Number, required: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;