// Production startup script that creates necessary directories
// and starts the server with proper environment variables

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('=== PRODUCTION STARTUP SCRIPT ===');
console.log(`Node.js version: ${process.version}`);
console.log(`Current directory: ${process.cwd()}`);

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = '8080';

// Ensure dist directory exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log(`Creating dist directory: ${distPath}`);
  fs.mkdirSync(distPath, { recursive: true });
}

// Ensure dist/public directory exists
const publicPath = path.join(distPath, 'public');
if (!fs.existsSync(publicPath)) {
  console.log(`Creating dist/public directory: ${publicPath}`);
  fs.mkdirSync(publicPath, { recursive: true });
}

// Create empty index.html if it doesn't exist
const indexPath = path.join(publicPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log(`Creating placeholder index.html: ${indexPath}`);
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harvest Brothers</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 32px; background-color: #f9fafb; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #38a169; }
    .message { background: #ffffff; border-left: 4px solid #38a169; padding: 16px; margin: 16px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Harvest Brothers</h1>
    <div class="message">
      <p>Loading application, please wait...</p>
    </div>
  </div>
</body>
</html>`;
  fs.writeFileSync(indexPath, html);
}

// Start the server using ESM import
console.log('Starting server...');
try {
  await import('./dist/index.js');
} catch (err) {
  console.error('Error starting server:', err);
  process.exit(1);
}