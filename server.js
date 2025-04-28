// Simple production-ready server (ES Module version)
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES Module fixes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application
const app = express();

// Set port - use environment variable or 8080 as fallback
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Log startup information
console.log('=== STARTING PRODUCTION SERVER ===');
console.log(`Node.js version: ${process.version}`);
console.log(`Current working directory: ${process.cwd()}`);
console.log(`PORT: ${PORT}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0'
  });
});

// Check if dist/public directory exists
const distPublicPath = path.join(process.cwd(), 'dist', 'public');
const distPath = path.join(process.cwd(), 'dist');

let staticPath = null;

// Try to find a valid static files path
if (fs.existsSync(distPublicPath)) {
  console.log(`Found static files directory at: ${distPublicPath}`);
  staticPath = distPublicPath;
} else if (fs.existsSync(distPath)) {
  console.log(`Found static files directory at: ${distPath}`);
  staticPath = distPath;
} else {
  console.error('ERROR: Could not find static files directory');
  // Fallback to current directory
  staticPath = process.cwd();
  console.log(`Using fallback static path: ${staticPath}`);
}

// Serve static files
app.use(express.static(staticPath));

// Add fallback route for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Create an emergency index.html
    const emergencyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Harvest Brothers</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 32px; }
            .container { max-width: 800px; margin: 0 auto; }
            h1 { color: #38a169; }
            .message { background: #f7fafc; border-left: 4px solid #38a169; padding: 16px; margin: 16px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Harvest Brothers</h1>
            <div class="message">
              <p><strong>Maintenance Notice:</strong></p>
              <p>The application is currently being deployed or undergoing maintenance.</p>
              <p>Please check back shortly. If the issue persists, contact support.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    res.send(emergencyHtml);
  }
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
  console.log('=== SERVER STARTED SUCCESSFULLY ===');
});