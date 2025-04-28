/**
 * Production helpers for Replit Deployment
 * These functions help ensure the application can run in production
 * even with potential issues in the build process
 */

import fs from 'fs';
import path from 'path';
import { Express } from 'express';
import express from 'express';

interface ErrorWithMessage {
  message: string;
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof (error as ErrorWithMessage).message === 'string') {
    return (error as ErrorWithMessage).message;
  }
  return 'Unknown error';
}

/**
 * Ensures that the necessary directories exist for production
 * and creates fallbacks if needed
 */
export function ensureProductionDirectories(): boolean {
  try {
    console.log('Checking production directories...');
    
    // List of possible build output directories
    const distPaths = [
      path.resolve(process.cwd(), 'dist', 'public'),
      path.resolve(process.cwd(), 'dist'),
      path.resolve(process.cwd(), 'build'),
      path.resolve(process.cwd(), 'public')
    ];
    
    let validDistPath = null;
    
    // Find the first valid path
    for (const p of distPaths) {
      if (fs.existsSync(p)) {
        validDistPath = p;
        console.log(`Found valid static files directory at: ${p}`);
        break;
      }
    }
    
    // If no valid path found, create the dist directory
    if (!validDistPath) {
      console.log('No valid distribution directory found. Creating fallback directories...');
      
      // Ensure dist directory exists
      const distPath = path.resolve(process.cwd(), 'dist');
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
        console.log(`Created directory: ${distPath}`);
      }
      
      // Ensure dist/public directory exists
      const publicPath = path.resolve(distPath, 'public');
      if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true });
        console.log(`Created directory: ${publicPath}`);
      }
      
      // Create a basic index.html if it doesn't exist
      const indexPath = path.resolve(publicPath, 'index.html');
      if (!fs.existsSync(indexPath)) {
        const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harvest Brothers</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 32px; background-color: #f9fafb; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #38a169; }
    .message { background: #ffffff; border-left: 4px solid #38a169; padding: 16px; margin: 16px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .footer { margin-top: 32px; font-size: 0.875rem; color: #6b7280; }
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
    <div class="footer">
      <p>&copy; 2025 Harvest Brothers - Agricultural Innovation</p>
    </div>
  </div>
</body>
</html>
        `;
        fs.writeFileSync(indexPath, fallbackHtml);
        console.log(`Created fallback index.html at: ${indexPath}`);
      }
      
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring production directories:', getErrorMessage(error));
    return false;
  }
}

/**
 * Configure static file serving for production with fallbacks
 */
export function configureStaticServing(app: Express): boolean {
  try {
    console.log('Configuring static file serving for production...');
    
    // List of possible build output directories
    const distPaths = [
      path.resolve(process.cwd(), 'dist', 'public'),
      path.resolve(process.cwd(), 'dist'),
      path.resolve(process.cwd(), 'build'),
      path.resolve(process.cwd(), 'public')
    ];
    
    let validDistPath = null;
    
    // Find the first valid path
    for (const p of distPaths) {
      if (fs.existsSync(p)) {
        validDistPath = p;
        console.log(`Using static files from: ${p}`);
        break;
      }
    }
    
    if (!validDistPath) {
      console.error('No valid static files directory found');
      return false;
    }
    
    // Serve static files
    app.use(express.static(validDistPath));
    
    // Serve index.html for all routes (client-side routing)
    const indexPath = path.resolve(validDistPath, 'index.html');
    
    app.get('*', (req, res) => {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        // Fallback if index.html doesn't exist
        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harvest Brothers</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 32px; background-color: #f9fafb; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #38a169; }
    .message { background: #ffffff; border-left: 4px solid #38a169; padding: 16px; margin: 16px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .footer { margin-top: 32px; font-size: 0.875rem; color: #6b7280; }
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
    <div class="footer">
      <p>&copy; 2025 Harvest Brothers - Agricultural Innovation</p>
    </div>
  </div>
</body>
</html>
        `);
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error configuring static file serving:', getErrorMessage(error));
    return false;
  }
}

/**
 * Logs the current production environment status
 */
export function logProductionStatus(): void {
  console.log('=== PRODUCTION ENVIRONMENT STATUS ===');
  console.log(`Node.js version: ${process.version}`);
  console.log(`Current working directory: ${process.cwd()}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`PORT: ${process.env.PORT || '(using default)'}`);
  
  try {
    // Check for critical directories
    const distPath = path.resolve(process.cwd(), 'dist');
    const distPublicPath = path.resolve(distPath, 'public');
    
    console.log(`dist directory exists: ${fs.existsSync(distPath)}`);
    console.log(`dist/public directory exists: ${fs.existsSync(distPublicPath)}`);
    
    if (fs.existsSync(distPublicPath)) {
      console.log(`dist/public files: ${fs.readdirSync(distPublicPath).join(', ')}`);
    }
    
  } catch (error) {
    console.error('Error checking directories:', getErrorMessage(error));
  }
  
  console.log('=====================================');
}