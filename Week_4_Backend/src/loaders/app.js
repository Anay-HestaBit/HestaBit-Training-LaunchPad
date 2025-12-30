import express from 'express';
import logger from '../utils/logger.js';
import { connectDB } from './db.js';

export default async function appLoader() {
  logger.info('Bootstrapping application');

  const app = express();

  // middlewares loaded
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  logger.info('Middlewares loaded');

  // database connection
  await connectDB();

  // routes (Day-1 placeholder)
  const routeCount = 0;
  logger.info(`Routes mounted: ${routeCount} endpoints`);

  return app;
}
