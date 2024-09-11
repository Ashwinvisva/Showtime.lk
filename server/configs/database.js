import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        logger.info(`Database Connection Success`);
    }).catch((error) => {
        logger.error(`Database Connection Failed: ${error}`);
    })
}

export default connectDatabase;