// Ultra-simple server for workflow testing with ES modules
import http from 'http';

const PORT = 5000;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Return health status for all routes
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ok',
    message: 'Harvest Brothers server is running',
    timestamp: new Date().toISOString()
  }));
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  // Specific log format for workflow detection
  console.log(`> Ready on port ${PORT}`);
});