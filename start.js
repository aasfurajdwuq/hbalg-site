// Production startup script that creates necessary directories
// and starts the server with proper environment variables

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('=== PRODUCTION STARTUP SCRIPT ===');
console.log(`Node.js version: ${process.version}`);
console.log(`Current directory: ${process.cwd()}`);

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = '8080'; // Match deployment port

// Ensure dist directory exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log(`Creating dist directory: ${distPath}`);
  fs.mkdirSync(distPath, { recursive: true });
}

// Start the server using ESM import
console.log('Starting server...');
try {
  await import('./dist/index.js');
} catch (err) {
  console.error('Error starting server:', err);
  process.exit(1);
}