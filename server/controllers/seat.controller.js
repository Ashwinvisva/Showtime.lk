import Seat from "../models/seat.models.js";

const generateID = async () => {
  const latest = await Seat.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'SEA001';

  const latestID = parseInt(latest.id.replace('SEA', ''));
  const newID = 'SEA' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const SeatController = {
    async createSeat(req, res) {
      try {
        const seat = new Seat(req.body);
        seat.id = await generateID();
        await seat.save();
        res.status(201).json(seat);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    async getSeats(req, res) {
      try {
        const seats = await Seat.find();
        res.status(200).json(seats);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    },
  
    async getSeatById(req, res) {
      try {
        const seat = await Seat.findById(req.params.id).populate('venue');
        if (!seat) return res.status(404).json({ message: "Seat not found" });
        res.status(200).json(seat);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    async updateSeat(req, res) {
      try {
        const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(seat);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    async deleteSeat(req, res) {
      try {
        await Seat.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Seat deleted successfully" });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  };
  
  export default SeatController;