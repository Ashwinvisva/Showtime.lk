import express from 'express';
import VenueController from '../controllers/venue.controller.js';

const VenueRouter = express.Router();

VenueRouter.post('/', VenueController.createVenue);
VenueRouter.get('/', VenueController.getVenues);
VenueRouter.get('/:id', VenueController.getVenueById);
VenueRouter.put('/:id', VenueController.updateVenue);
VenueRouter.delete('/:id', VenueController.deleteVenue);

export default VenueRouter;