import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  id: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  columnNo: { type: Number, required: true },
  rowNo: { type: Number, required: true },
  isValidated: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
