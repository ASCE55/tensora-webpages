import app from './src/app.js';
import { config } from './src/config/index.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  🚀 TENSORA DIGITAL SOLUTIONS - BACKEND SERVER        `);
  console.log(`=======================================================`);
  console.log(`  🌐 Environment : ${config.nodeEnv.toUpperCase()}     `);
  console.log(`  🔌 API Base URL: http://localhost:${PORT}/api        `);
  console.log(`  🩺 Health Check: http://localhost:${PORT}/api/health `);
  console.log(`  ⚡ Ready to serve Website & Dashboard Frontends      `);
  console.log(`=======================================================`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default server;
