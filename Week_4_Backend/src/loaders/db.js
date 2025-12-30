import mongoose from 'mongoose';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.dbUrl);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error(error, ' MongoDB connection failed');
    process.exit(1); // for fast failing
  }
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error(error, ' Error during MongoDB disconnect');
  }
}
