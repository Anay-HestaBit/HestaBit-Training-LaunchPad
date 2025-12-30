import pino from 'pino';
import config from '../config/index.js';

const logger = pino({
  level: config.logLevel,
  transport: config.env !== 'prod' ? { target: 'pino-pretty' } : undefined,
});

export default logger;
