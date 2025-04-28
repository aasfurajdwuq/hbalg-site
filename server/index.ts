import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// IMPORTANT: In production, these must be set in the Deployment settings
// SESSION_SECRET - Used for session security
// SENDGRID_API_KEY - Used for email sending
// For development, we'll use fallback values

// Set default environment variables without conditional checks
// This ensures the app can start regardless of environment configuration
const defaults = {
  SESSION_SECRET: 'temporary-development-secret',
  SENDGRID_API_KEY: 'disabled-in-development'
};

// Set environment variables with fallbacks - simplified approach
Object.entries(defaults).forEach(([key, defaultValue]) => {
  // Only set fallbacks in development, never in production
  if (!process.env[key] && process.env.NODE_ENV !== 'production') {
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
      console.error(`CRITICAL ERROR: Missing required environment variables in production: ${missingVars.join(', ')}`);
      console.error('Please add these variables in the Deployment settings, not in the Secrets tab');
      console.error('Application cannot start safely in production without these variables');
      // In production, we should fail fast if environment variables are missing
      if (process.env.NODE_ENV === 'production') {
        // Wait a moment to ensure logs are flushed before exiting
        setTimeout(() => process.exit(1), 100);
        return;
      }
    }
  }
  
  // Explicitly bind to 0.0.0.0 to listen on all network interfaces
  server.listen(port, '0.0.0.0', () => {
    log(`Server running on http://0.0.0.0:${port}`);
    log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.NODE_ENV === 'production') {
      // In production, just log if the variables are configured
      log(`SESSION_SECRET: ${process.env.SESSION_SECRET ? 'Configured' : 'MISSING - APPLICATION MAY BE INSECURE'}`);
      log(`SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'MISSING - EMAIL FUNCTIONALITY DISABLED'}`);
    } else {
      // In development, we use fallbacks
      log(`Using SESSION_SECRET: ${process.env.SESSION_SECRET ? 'Custom Value' : 'Default Development Value'}`);
      log(`Using SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? 'Custom Value' : 'Disabled in Development'}`);
    }
  }).on('error', (err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
  });
})();