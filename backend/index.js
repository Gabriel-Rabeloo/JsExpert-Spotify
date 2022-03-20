import server from './server.js';
import config from './config.js';
import { logger } from './util.js';

// fix: como agora é uma função mudei a chamada
server()
  .listen(config.port)
  .on('listening', () => logger.info(`server running at ${config.port}!!`));
