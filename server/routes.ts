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

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate the form data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Send email
      const emailSent = await sendContactEmail(validatedData);
      
      if (emailSent) {
        res.status(200).json({ message: 'Message sent successfully' });
      } else {
        res.status(500).json({ message: 'Failed to send message' });
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
      
      // Send email
      const emailSent = await sendInvestorEmail(validatedData);
      
      if (emailSent) {
        res.status(200).json({ message: 'Investment inquiry sent successfully' });
      } else {
        res.status(500).json({ message: 'Failed to send investment inquiry' });
      }
    } catch (error) {
      console.error('Investor form submission error:', error);
      res.status(400).json({ message: 'Invalid form data', error });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
