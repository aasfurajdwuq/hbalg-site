import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// IMPORTANT: In production, these must be set in the Deployment settings
// SESSION_SECRET - Used for session security
// SENDGRID_API_KEY - Used for email sending

const defaults = {
  SESSION_SECRET: 'temporary-development-secret',
  SENDGRID_API_KEY: 'disabled-in-development'
};

Object.entries(defaults).forEach(([key, defaultValue]) => {
  if (!process.env[key]) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(`Warning: ${key} not set in production environment, using fallback`);
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
  const port = parseInt(process.env.PORT || "5000", 10);
  
  // Check for required environment variables in production
  if (process.env.NODE_ENV === 'production') {
    const missingVars = [];
    if (!process.env.SESSION_SECRET) missingVars.push('SESSION_SECRET');
    if (!process.env.SENDGRID_API_KEY) missingVars.push('SENDGRID_API_KEY');
    
    if (missingVars.length > 0) {
      console.error(`WARNING: Missing environment variables in production: ${missingVars.join(', ')}`);
      console.error('Please add these variables in the Deployment settings, not in the Secrets tab');
      console.error('Some features may not work correctly without these variables');
      
      // Set default fallback values even in production to prevent crashes
      if (!process.env.SESSION_SECRET) {
        console.error('Using insecure fallback SESSION_SECRET in production - NOT RECOMMENDED');
        process.env.SESSION_SECRET = 'fallback-production-session-secret-' + Date.now();
      }
      
      if (!process.env.SENDGRID_API_KEY) {
        console.error('Using disabled SENDGRID_API_KEY in production - email features will not work');
        process.env.SENDGRID_API_KEY = 'disabled-in-production';
      }
    }
  }
  
  // Explicitly bind to 0.0.0.0 to listen on all network interfaces
  server.listen(port, '0.0.0.0', () => {
    log(`Server running on port ${port}`);
    log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    log(`Bound to interface: 0.0.0.0`);
    
    // Log environment variable status
    const envStatus = {
      SESSION_SECRET: process.env.SESSION_SECRET ? 'Configured' : 'Using fallback',
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? 'Configured' : 'Using fallback'
    };
    
    Object.entries(envStatus).forEach(([key, status]) => {
      log(`${key}: ${status}`);
    });
  }).on('error', (err) => {
    console.error('Server failed to start:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`);
    }
    process.exit(1);
  });
})();