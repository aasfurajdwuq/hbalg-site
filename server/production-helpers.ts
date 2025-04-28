import fs from 'fs';
import path from 'path';
import { log } from './vite';

// Define error type to handle type checking
interface ErrorWithMessage {
  message: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as ErrorWithMessage).message;
  }
  return 'Unknown error occurred';
}

/**
 * Ensures that the necessary directories exist for production
 * and creates fallbacks if needed
 */
export function ensureProductionDirectories(): boolean {
  try {
    // Check for the dist directory
    const distPath = path.resolve(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      log(`WARNING: dist directory not found at ${distPath}`);
      try {
        fs.mkdirSync(distPath, { recursive: true });
        log(`Created missing dist directory at ${distPath}`);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        log(`ERROR: Failed to create dist directory: ${errorMessage}`);
        return false;
      }
    }

    // Check for the public directory inside dist
    const publicPath = path.resolve(distPath, 'public');
    if (!fs.existsSync(publicPath)) {
      log(`WARNING: public directory not found at ${publicPath}`);
      try {
        fs.mkdirSync(publicPath, { recursive: true });
        log(`Created missing public directory at ${publicPath}`);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        log(`ERROR: Failed to create public directory: ${errorMessage}`);
        return false;
      }
    }

    // Check for index.html
    const indexPath = path.resolve(publicPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      log(`WARNING: index.html not found at ${indexPath}`);
      try {
        // Create a minimal fallback index.html
        const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harvest Brothers - Agricultural Investment</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .alert { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
    h1 { color: #38a169; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Harvest Brothers</h1>
    <div class="alert">
      <p><strong>Application Notice:</strong> The application is currently in maintenance mode.</p>
      <p>Please try refreshing the page. If the issue persists, please contact support.</p>
    </div>
  </div>
</body>
</html>`;
        fs.writeFileSync(indexPath, fallbackHtml);
        log(`Created fallback index.html at ${indexPath}`);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        log(`ERROR: Failed to create fallback index.html: ${errorMessage}`);
        return false;
      }
    }

    return true;
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    log(`ERROR in ensureProductionDirectories: ${errorMessage}`);
    return false;
  }
}

/**
 * Logs the current production environment status
 */
export function logProductionStatus(): void {
  try {
    log('=== PRODUCTION DEPLOYMENT STATUS ===');
    
    // Check Node.js version
    log(`Node.js version: ${process.version}`);
    
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    log(`Memory usage: ${Math.round(memoryUsage.rss / 1024 / 1024)}MB RSS`);
    
    // Check current directory
    log(`Current working directory: ${process.cwd()}`);
    
    // Check dist directory
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      log(`dist directory exists: ${distPath}`);
      
      // List dist contents
      const distContents = fs.readdirSync(distPath);
      log(`dist directory contents: ${distContents.join(', ')}`);
      
      // Check public directory
      const publicPath = path.resolve(distPath, 'public');
      if (fs.existsSync(publicPath)) {
        log(`public directory exists: ${publicPath}`);
        
        // List public contents
        const publicContents = fs.readdirSync(publicPath);
        log(`public directory contents: ${publicContents.join(', ')}`);
        
        // Check for index.html
        const indexPath = path.resolve(publicPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          const stats = fs.statSync(indexPath);
          log(`index.html exists: ${indexPath} (${stats.size} bytes)`);
        } else {
          log(`WARNING: index.html not found at ${indexPath}`);
        }
      } else {
        log(`WARNING: public directory not found at ${publicPath}`);
      }
    } else {
      log(`WARNING: dist directory not found at ${distPath}`);
    }
    
    // Check environment variables
    log(`NODE_ENV: ${process.env.NODE_ENV}`);
    log(`PORT: ${process.env.PORT || '(not set)'}`);
    
    log('===================================');
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    log(`ERROR in logProductionStatus: ${errorMessage}`);
  }
}