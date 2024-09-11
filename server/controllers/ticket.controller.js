import Ticket from "../models/ticket.model.js";

const generateID = async () => {
  const latest = await Ticket.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'TCK001';

  const latestID = parseInt(latest.id.replace('TCK', ''));
  const newID = 'TCK' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const TicketController = {
  createTicket: async (req, res) => {
    try {
      const ticket = new Ticket(req.body);
      ticket.id = await generateID();
      ticket.isValidated = false;
      await ticket.save();
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getTicketById: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) res.status(404).json({ message: "Ticket not found" });
      else res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getTicketByEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const tickets = await Ticket.find({ event: id })
        .populate("event")
        .populate("user")
        .exec();

      if (tickets.length === 0) {
        return res.status(404).send("No tickets found for this event");
      }

      res.json(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).send("Internal server error");
    }
  },

  getTicketByUser: async (req, res) => {
    try {
      const { id } = req.params;
      const tickets = await Ticket.find({ user: id })
        .populate("event")
        .populate({
          path: "event",
          populate: {
            path: "venue",
            model: "Venue",
          },
        })
        .populate("user");
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).send("Internal server error");
    }
  },

  updateTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteTicket: async (req, res) => {
    try {
      await Ticket.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  validateTicket: async (req, res) => {
    try {
      const ticketCheck = await Ticket.findById(req.params.id);

      if (ticketCheck.isValidated == true) {
        res.status(200).json({ message: "Ticket Already Validated" });
        return;
      }

      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { isValidated: true },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Ticket Validated Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default TicketController;
