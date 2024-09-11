import express from 'express';
import PaymentController from '../controllers/payment.controller.js';

const PaymentRouter = express.Router();

PaymentRouter.post('/', PaymentController.createPayment);
PaymentRouter.get('/', PaymentController.getPayments);
PaymentRouter.get('/:id', PaymentController.getPaymentById);
PaymentRouter.get('/user/:userId', PaymentController.getPaymentsByUser);
PaymentRouter.put('/:id', PaymentController.updatePayment);
PaymentRouter.delete('/:id', PaymentController.deletePayment);

export default PaymentRouter;
