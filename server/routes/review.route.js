import express from 'express';
import ReviewController from '../controllers/review.controller.js';

const ReviewRouter = express.Router();

ReviewRouter.post('/', ReviewController.createReview);
ReviewRouter.get('/', ReviewController.getReviews);
ReviewRouter.get('/:id', ReviewController.getReviewById);
ReviewRouter.get('/event/:eventId/user/:userId', ReviewController.getReviewByUserAndEvent);
ReviewRouter.get('/average-rating/:eventId', ReviewController.getAverageRatingsByEvent);
ReviewRouter.put('/:id', ReviewController.updateReview);
ReviewRouter.delete('/:id', ReviewController.deleteReview);

export default ReviewRouter;
