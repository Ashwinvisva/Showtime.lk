import Review from "../models/review.model.js";

const generateID = async () => {
  const latest = await Review.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'REV001';

  const latestID = parseInt(latest.id.replace('REV', ''));
  const newID = 'REV' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const ReviewController = {
  createReview: async (req, res) => {
    try {
      const review = new Review(req.body);
      review.id = await generateID();
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find().populate("user").populate("event");
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id)
        .populate("user")
        .populate("event");
      if (!review) res.status(404).json({ message: "Review not found" });
      else res.status(200).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getReviewByUserAndEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;

      const review = await Review.find({ event: eventId, user: userId })
        .populate("user")
        .populate("event");
      res.status(200).json(review);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getAverageRatingsByEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;

      const review = await Review.find({ event: eventId });

      let total = 0;
      let avg = 0;

      for (let i = 0; i < review.length; i++) {
        total = total + review[i].rating;
      }

      avg = total / review.length;

      res.status(200).json({ rating: avg });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

export default ReviewController;
