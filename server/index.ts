import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Set default environment variables
const defaults = {
  SESSION_SECRET: process.env.NODE_ENV === 'production' ? process.env.SESSION_SECRET : 'temporary-secret',
  SENDGRID_API_KEY: process.env.NODE_ENV === 'production' ? process.env.SENDGRID_API_KEY : 'disabled'
};

// Set environment variables with fallbacks
Object.entries(defaults).forEach(([key, defaultValue]) => {
  if (!process.env[key]) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(`Warning: ${key} not set in production. Some features may be disabled.`);
    }
    process.env[key] = defaultValue;
  }
});

// Log environment status
console.log('Environment configuration loaded');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

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

(async () => {
  // Using in-memory storage
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : (err.message || 'Internal Server Error');
    
    console.error('Server error:', err);
    res.status(status).json({ message });
    
    if (process.env.NODE_ENV !== 'production') {
      throw err;
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    await setupVite(app, server);
  }

  // Server configuration for both local development and cloud deployment
  // Port 5000 is used for local development, but Cloud Run may assign a different port via PORT env variable
  const port = parseInt(process.env.PORT || '5000');
  
  // Explicitly bind to 0.0.0.0 to listen on all network interfaces
  // This is essential for cloud deployments like Cloud Run
  server.listen(port, '0.0.0.0', () => {
    log(`Server running on http://0.0.0.0:${port}`);
    log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    log(`Using SESSION_SECRET: ${process.env.SESSION_SECRET ? 'Configured' : 'Missing!'}`);
    log(`Using SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'Missing!'}`);
    
    // Additional logging to help with cloud deployment
    log(`Listening on port ${port} and bound to 0.0.0.0 (all interfaces)`);
  });
})();