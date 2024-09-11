import Contact from "../models/contact.model.js";

const generateID = async () => {
  const latest = await Contact.findOne({}, {}, { sort: { createdAt: -1 } });

  if (!latest || !latest.createdAt || !latest.id) return "CNT001";

  const latestID = parseInt(latest.id.replace("CNT", ""));
  const newID = "CNT" + ("000" + (latestID + 1)).slice(-3);

  return newID;
};

const ContactController = {
  submitAnswers: async (req, res) => {
    try {
      const newAnswers = new Contact({...req.body, id: await generateID()});
      await newAnswers.save();
      res.status(201).json({ message: "Answers submitted successfully!" });
    } catch (error) {
      console.error("Error submitting answers:", error);
      res
        .status(400)
        .json({
          message:
            "An error occurred while submitting answers. Please try again later.",
        });
    }
  },

  getAllAnswers: async (req, res) => {
    try {
      const answers = await Contact.find().populate('user');
      res.status(200).json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching answers." });
    }
  },
};

export default ContactController;
