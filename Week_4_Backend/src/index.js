import config from './config/index.js';
import logger from './utils/logger.js';
import appLoader from './loaders/app.js';
import { disconnectDB } from './loaders/db.js';

async function startServer() {
  const app = await appLoader();

  const server = app.listen(config.port, () => {
    logger.info(`Server started on Port ${config.port}`);
  });

  const shutDown = async () => {
    logger.info('Graceful ShutDown Started');

    server.close(async () => {
      await disconnectDB();
      logger.info('Process Exiting');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutDown);
  process.on('SIGTERM', shutDown);
}

startServer();
