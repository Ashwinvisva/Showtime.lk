import Venue from "../models/venue.model.js";

const generateID = async () => {
  const latest = await Venue.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'VNE001';

  const latestID = parseInt(latest.id.replace('VNE', ''));
  const newID = 'VNE' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const VenueController = {
    async createVenue(req, res) {
      try {
        const venue = new Venue(req.body);
        venue.id = await generateID();
        await venue.save();
        res.status(201).json(venue);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    
    async getVenues(req, res) {
      try {
        const venues = await Venue.find();
        res.status(200).json(venues);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    },
  
    async getVenueById(req, res) {
      try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) return res.status(404).json({ message: "Venue not found" });
        res.status(200).json(venue);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    async updateVenue(req, res) {
      try {
        const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(venue);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    async deleteVenue(req, res) {
      try {
        await Venue.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Venue deleted successfully" });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  };
  
  export default VenueController;