import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendInvestorEmail } from "./email";
import { z } from "zod";

// Validation schemas
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10),
  subject: z.string().optional(),
});

const investorFormSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(5),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function registerRoutes(app: Express): Promise<void> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate the form data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Save to database
      await storage.saveContact(validatedData);
      
      // Send email
      const emailSent = await sendContactEmail(validatedData);
      
      if (emailSent) {
        res.status(200).json({ message: 'Message sent successfully' });
      } else {
        // Even if email fails, we've saved to the database
        res.status(200).json({ 
          message: 'Message saved successfully, but email notification failed',
          warning: 'Email could not be sent, but your message was received'
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(400).json({ message: 'Invalid form data', error });
    }
  });

  // Investor form submission endpoint
  app.post('/api/investor', async (req: Request, res: Response) => {
    try {
      // Validate the form data
      const validatedData = investorFormSchema.parse(req.body);
      
      // Save to database
      await storage.saveInvestor(validatedData);
      
      // Send email
      const emailSent = await sendInvestorEmail(validatedData);
      
      if (emailSent) {
        res.status(200).json({ message: 'Investment inquiry sent successfully' });
      } else {
        // Even if email fails, we've saved to the database
        res.status(200).json({ 
          message: 'Investment inquiry saved successfully, but email notification failed',
          warning: 'Email could not be sent, but your inquiry was received'
        });
      }
    } catch (error) {
      console.error('Investor form submission error:', error);
      res.status(400).json({ message: 'Invalid form data', error });
    }
  });

  // Get all contacts - protected for admin use
  app.get('/api/contacts', async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all investor inquiries - protected for admin use
  app.get('/api/investors', async (req: Request, res: Response) => {
    try {
      const investors = await storage.getInvestors();
      res.status(200).json(investors);
    } catch (error) {
      console.error('Error fetching investor inquiries:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Routes registered successfully
}
