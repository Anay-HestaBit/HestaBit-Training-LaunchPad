import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'local';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

const config = {
  env,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  logLevel: process.env.LOG_LEVEL || 'info',
};

if (!config.port || !config.dbUrl) {
  throw new Error('Missing required Environment Variables');
}

export default config;
