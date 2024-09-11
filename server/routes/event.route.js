import express from 'express';
import EventController from '../controllers/event.controller.js';
import multer from 'multer';

const EventRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });

EventRouter.post('/', upload.single('image'),  EventController.createEvent);
EventRouter.get('/', EventController.getEvents);
EventRouter.get('/:id', EventController.getEventById);
EventRouter.put('/:id', EventController.updateEvent);
EventRouter.delete('/:id', EventController.deleteEvent);

export default EventRouter;
