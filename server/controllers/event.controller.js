import Event from "../models/event.model.js";

const generateID = async () => {
  const latest = await Event.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'EVT001';

  const latestID = parseInt(latest.id.replace('EVT', ''));
  const newID = 'EVT' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const EventController = {
  createEvent: async (req, res) => {
    let newEvent = {
      ...req.body,
      image: req.file ? req.file.path : null,
      id: await generateID()
    };
    try {
      const event = new Event(newEvent);
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getEvents: async (req, res) => {
    try {
      const events = await Event.find().populate("venue");
      res.status(200).json(events);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate("venue");
      if (!event) res.status(404).json({ message: "Event not found" });
      else res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

export default EventController;
