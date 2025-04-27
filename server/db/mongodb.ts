import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from '../vite';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/harvest-brothers';

// Initialize connection once
export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      log('MongoDB connection already established', 'mongodb');
      return;
    }
    
    log('Connecting to MongoDB...', 'mongodb');
    await mongoose.connect(MONGODB_URI);
    log('Connected to MongoDB successfully', 'mongodb');
  } catch (error) {
    log(`MongoDB connection error: ${error}`, 'mongodb');
    throw new Error(`MongoDB connection failed: ${error}`);
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  log('MongoDB connection established', 'mongodb');
});

mongoose.connection.on('error', (err) => {
  log(`MongoDB connection error: ${err}`, 'mongodb');
});

mongoose.connection.on('disconnected', () => {
  log('MongoDB connection disconnected', 'mongodb');
});

// Close the Mongoose connection before terminating the app
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    log('MongoDB connection closed due to app termination', 'mongodb');
    process.exit(0);
  } catch (err) {
    log(`Error during MongoDB disconnection: ${err}`, 'mongodb');
    process.exit(1);
  }
});

export default mongoose;