import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  date: Date,
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  eventGenre: String,
  artists: [String],
  description: String,
  ticketPrice: Number,
  organizedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
