import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  id: String,
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  columnNo: { type: Number, required: true },
  rowNo: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
