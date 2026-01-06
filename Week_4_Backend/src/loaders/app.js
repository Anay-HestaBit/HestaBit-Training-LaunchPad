import express from 'express';
import logger from '../utils/logger.js';
import { connectDB } from './db.js';
import mountRoutes from '../routes/index.js';
import errorMiddleware from '../middlewares/error.middleware.js';

export default async function appLoader() {
  logger.info('Bootstrapping application');

  const app = express();

  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  logger.info('Middlewares loaded');

  await connectDB();

  const routeCount = mountRoutes(app);
  logger.info(`Routes mounted: ${routeCount} modules`);

  app.use(errorMiddleware);
  return app;
}
