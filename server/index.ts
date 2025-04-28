import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { ensureProductionDirectories, logProductionStatus, configureStaticServing } from "./production-helpers";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import http from "http";

// Start with extremely detailed logging to help debug deployment issues
console.log('====================================================');
console.log('STARTING SERVER - ' + new Date().toISOString());
console.log('Node.js version: ' + process.version);
console.log('Current directory: ' + process.cwd());
console.log('====================================================');

// Enhanced environment variable handling with extensive fallbacks
try {
  // Attempt to load environment variables from .env file
  dotenv.config();
  console.log('Environment configuration loaded successfully');
} catch (error) {
  // Fallback if dotenv fails
  console.log('Environment config loading failed, using default configuration');
}

// Define critical environment defaults with explicit explanation
// These ensure the application never fails due to missing environment variables
const ENV_DEFAULTS = {
  // For deployment, force production as the default
  NODE_ENV: 'production',
  // Use port 8080 for Replit deployment
  PORT: '8080',
};

// Apply defaults for any missing environment variables
// In development, always use port 5000 to match workflow configuration
if (process.env.NODE_ENV === 'development') {
  process.env.PORT = '5000';
  console.log('Development mode: Forcing PORT=5000 to match workflow configuration');
} else {
  // In production, set defaults if not already set
  Object.entries(ENV_DEFAULTS).forEach(([key, value]) => {
    if (typeof process.env[key] === 'undefined') {
      console.log(`Setting default value for missing environment variable: ${key}=${value}`);
      process.env[key] = value;
    }
  });
}

// Log all environment variables for debugging (excluding sensitive ones)
console.log('=== ENVIRONMENT CONFIGURATION ===');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);
console.log('==================================');

// Create Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
  });
});

// Request logging middleware
// Get port from environment with fallback
const PORT = process.env.PORT || '5000';

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Capture JSON responses for logging
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Main application initialization with proper error handling
(async function initializeApplication() {
  try {
    // In production mode, ensure all necessary directories exist
    if (process.env.NODE_ENV === 'production') {
      console.log('Running pre-flight checks for production environment');
      ensureProductionDirectories();
      logProductionStatus();
    }

    // Using in-memory storage
    console.log('Initializing routes and storage');
    const server = await registerRoutes(app);
    console.log('Routes initialized successfully');

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : (err.message || 'Internal Server Error');

      console.error('Server error:', err);
      res.status(status).json({ message });

      if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
      }
    });

    // Setup static file serving or development server
    if (process.env.NODE_ENV === "production") {
      console.log('Running in production mode - serving static files');
      try {
        serveStatic(app);
        console.log('Static file serving configured successfully');
      } catch (error) {
        console.error('ERROR setting up static file serving:', error);

        // Primary fallback using our enhanced configureStaticServing helper
        try {
          console.log('Attempting first fallback using configureStaticServing helper');
          if (configureStaticServing(app)) {
            console.log('Successfully configured static file serving with enhanced helper');
          } else {
            // Secondary emergency fallback for static file serving
            console.log('Attempting second emergency fallback for static file serving');
            const distPath = path.resolve(process.cwd(), 'dist');
            if (fs.existsSync(distPath)) {
              app.use(express.static(distPath));
              console.log('Secondary fallback static serving from:', distPath);

              // Universal handler for client-side routing
              app.get('*', (_req, res) => {
                try {
                  const indexPath = path.join(distPath, 'index.html');
                  if (fs.existsSync(indexPath)) {
                    res.sendFile(indexPath);
                  } else {
                    throw new Error('index.html not found');
                  }
                } catch (e) {
                  // Last resort fallback if we can't find index.html
                  res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Harvest Brothers</title>
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
                          <p>Please check back shortly. If the issue persists, contact support@hbalg.com.</p>
                        </div>
                      </div>
                    </body>
                    </html>
                  `);
                }
              });
            } else {
              console.error('CRITICAL: Cannot find static files directory');
            }
          }
        } catch (fbError) {
          console.error('CRITICAL: Failed to set up fallback static serving:', fbError);
        }
      }
    } else {
      console.log('Running in development mode - setting up Vite');
      await setupVite(app, server);
      console.log('Vite development server configured successfully');
    }

    // Server configuration with enhanced error handling
    // In production, ALWAYS use port 8080 for Replit Deployments
    // In development, use port 5000 to match workflow configuration
    let PORT: number;
    if (process.env.PORT) {
      PORT = parseInt(process.env.PORT, 10);
      if (isNaN(PORT)) {
        console.warn(`Invalid PORT value: "${process.env.PORT}", using default 8080`);
        PORT = 8080;
      }
    } else {
      PORT = process.env.NODE_ENV === 'production' ? 8080 : 5000;
    }
    console.log(`Using PORT ${PORT} (${process.env.NODE_ENV} mode)`);

    // Always bind to all interfaces for proper deployment
    const HOST = '0.0.0.0';

    // Start the server with comprehensive logging
    server.listen(PORT, HOST, () => {
      console.log('=== SERVER STARTED SUCCESSFULLY ===');
      // Log this specific message to notify Replit that the server is ready
      console.log(`> Server is listening on port ${PORT}`);

      log(`Server running on port ${PORT}`);
      log(`PORT environment variable: ${process.env.PORT || 'not set (using fallback)'}`);
      log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      log(`Bound to interface: ${HOST}`);
      log(`Process ID: ${process.pid}`);
      log(`Working directory: ${process.cwd()}`);

      // Send an HTTP request to ourselves to signal the workflow system
      if (process.env.NODE_ENV === 'development') {
        try {
          console.log('Sending self-check request to trigger workflow detection...');

          // Wait a second before sending the request to ensure the server is ready
          setTimeout(() => {
            const options = {
              hostname: HOST,
              port: PORT,
              path: '/health',
              method: 'GET',
            };

            const req = http.request(options, () => {
              console.log('Self-check complete - workflow should detect the server now');
            });

            req.on('error', (e: Error) => {
              console.error('Self-check failed:', e.message);
            });

            req.end();
          }, 1000);
        } catch (e) {
          console.error('Failed to send self-check request:', e);
        }
      }

      // In production, log detailed status
      if (process.env.NODE_ENV === 'production') {
        logProductionStatus();
      }

      log('======================================');
    }).on('error', (err: Error & {code?: string}) => {
      console.error('=== SERVER FAILED TO START ===');
      console.error(`Error: ${err.message}`);

      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
      }

      // Try an alternative port if the primary port is in use
      if (err.code === 'EADDRINUSE' && process.env.NODE_ENV === 'production') {
        const alternatePort = 3000;
        console.log(`Attempting to use alternate port: ${alternatePort}`);

        server.listen(alternatePort, HOST, () => {
          console.log(`Server started on alternate port ${alternatePort}`);
        }).on('error', (altErr) => {
          console.error(`Failed to start on alternate port: ${altErr.message}`);
          process.exit(1);
        });
      } else {
        console.error('===============================');
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('=== FATAL APPLICATION ERROR ===');
    console.error('Application failed to initialize');
    console.error(error);
    console.error('================================');
    process.exit(1);
  }
})();