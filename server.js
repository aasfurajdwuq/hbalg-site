import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from dist/public
const publicPath = path.join(process.cwd(), 'dist', 'public');
if (fs.existsSync(publicPath)) {
  console.log(`Serving static files from: ${publicPath}`);
  app.use(express.static(publicPath));

  // Serve index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});