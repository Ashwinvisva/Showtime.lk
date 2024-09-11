import express from 'express';
import ContactController from '../controllers/contact.controller.js';

const ContactRouter = express.Router();

ContactRouter.post('/', ContactController.submitAnswers);
ContactRouter.get('/', ContactController.getAllAnswers);

export default ContactRouter;
