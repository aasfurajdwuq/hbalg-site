// Simple CommonJS server for testing
const http = require('http');
const express = require('express');
const app = express();

const PORT = 5000;
const HOST = '0.0.0.0';

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('*', (req, res) => {
  res.send('<h1>Harvest Brothers API</h1><p>Server is running correctly.</p>');
});

// Start server with specific message for workflow detection
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
  console.log(`> Ready on port ${PORT}`);
});