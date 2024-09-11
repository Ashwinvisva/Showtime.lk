import express from 'express';
import TicketController from '../controllers/ticket.controller.js';

const TicketRouter = express.Router();

TicketRouter.post('/', TicketController.createTicket);
TicketRouter.get('/', TicketController.getTickets);
TicketRouter.get('/:id', TicketController.getTicketById);
TicketRouter.get('/event/:id', TicketController.getTicketByEvent);
TicketRouter.get('/user/:id', TicketController.getTicketByUser);
TicketRouter.put('/:id', TicketController.updateTicket);
TicketRouter.delete('/:id', TicketController.deleteTicket);

export default TicketRouter;
