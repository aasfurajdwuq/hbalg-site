import mongoose, { Document, Schema } from 'mongoose';

// Contact interface
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Contact schema
const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the Contact model
const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;