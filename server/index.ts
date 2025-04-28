import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Environment variable configuration
if (process.env.NODE_ENV === 'production') {
  const requiredVars = ['SESSION_SECRET', 'SENDGRID_API_KEY'];
  const missing = requiredVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missing.join(', ')}`);
    console.warn('Using fallback values - some features may be limited');
    
    if (!process.env.SESSION_SECRET) {
      process.env.SESSION_SECRET = `fallback-session-${Date.now()}`;
    }
    if (!process.env.SENDGRID_API_KEY) {
      process.env.SENDGRID_API_KEY = 'disabled';
    }
  }
} else {
  // Development defaults
  if (!process.env.SESSION_SECRET) process.env.SESSION_SECRET = 'temporary-development-secret';
  if (!process.env.SENDGRID_API_KEY) process.env.SENDGRID_API_KEY = 'disabled-in-development';
}

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
  const host = '0.0.0.0';
  
  // Environment checks moved to app initialization
  
  server.listen(port, host, () => {
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