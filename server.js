// Simple Express server for production
const express = require('express');
const path = require('path');
const fs = require('fs');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '8080';

// Create Express application
const app = express();

// Add simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
  });
});

// API routes
app.post('/api/contact', (req, res) => {
  console.log('Contact form submission received');
  res.status(200).json({ success: true, message: 'Form submitted successfully' });
});

app.post('/api/investor', (req, res) => {
  console.log('Investor form submission received');
  res.status(200).json({ success: true, message: 'Form submitted successfully' });
});

// Serve static files
console.log('Setting up static file serving...');
const possiblePaths = [
  path.join(process.cwd(), 'dist', 'public'),
  path.join(process.cwd(), 'dist'),
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'build')
];

let staticPath = null;
for (const dir of possiblePaths) {
  if (fs.existsSync(dir)) {
    staticPath = dir;
    console.log(`Found static files directory: ${dir}`);
    break;
  }
}

if (staticPath) {
  app.use(express.static(staticPath));
  
  // Serve index.html for all routes (client-side routing)
  app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      // If index.html doesn't exist, send a fallback HTML
      res.send(`
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
      <p><strong>Welcome to Harvest Brothers</strong></p>
      <p>The application is currently being deployed or undergoing maintenance.</p>
      <p>Please check back shortly. If the issue persists, contact support@hbalg.com.</p>
    </div>
  </div>
</body>
</html>
      `);
    }
  });
} else {
  console.error('No static files directory found!');
  
  // Fallback route to show error page
  app.get('*', (req, res) => {
    res.status(500).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harvest Brothers - Server Error</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 32px; background-color: #f9fafb; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #e53e3e; }
    .message { background: #ffffff; border-left: 4px solid #e53e3e; padding: 16px; margin: 16px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Server Error</h1>
    <div class="message">
      <p><strong>Application Error</strong></p>
      <p>The server could not locate the necessary files to run the application.</p>
      <p>Please contact support@hbalg.com for assistance.</p>
    </div>
  </div>
</body>
</html>
    `);
  });
}

// Start server
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Static files directory: ${staticPath || 'Not found'}`);
});