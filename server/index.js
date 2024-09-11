import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import connectDatabase from "./configs/database.js";
import VenueRouter from "./routes/venue.route.js";
import SeatRouter from "./routes/seat.route.js";
import EventRouter from "./routes/event.route.js";
import UserRouter from "./routes/user.route.js";
import ReviewRouter from "./routes/review.route.js";
import TicketRouter from "./routes/ticket.route.js";
import PaymentRouter from "./routes/payment.route.js";
import ContactRouter from "./routes/contact.route.js";

dotenv.config();

const PORT = process.env.PORT || 8081;

const app = express();

app.use(cors());
app.use(express.json({limit: "20mb"}));
app.use('/uploads', express.static('uploads'));

app.use('/api/venues', VenueRouter);
app.use('/api/seats', SeatRouter);
app.use('/api/tickets', TicketRouter);
app.use('/api/events', EventRouter);
app.use('/api/users', UserRouter);
app.use('/api/reviews', ReviewRouter);
app.use('/api/payments',PaymentRouter);
app.use('/api/contact', ContactRouter);

app.listen(PORT, () => {
    logger.info(`Server has started and running on PORT ${PORT}`);
    connectDatabase();
});

app.get('/', (req, res) => {
    res.json('Server is running!');
});

export default app;
