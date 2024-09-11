import express from 'express';
import SeatController from '../controllers/seat.controller.js';

const SeatRouter = express.Router();

SeatRouter.post('/', SeatController.createSeat);
SeatRouter.get('/', SeatController.getSeats);
SeatRouter.get('/:id', SeatController.getSeatById);
SeatRouter.put('/:id', SeatController.updateSeat);
SeatRouter.delete('/:id', SeatController.deleteSeat);

export default SeatRouter;