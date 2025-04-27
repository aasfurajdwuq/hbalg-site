import mongoose, { Document, Schema } from 'mongoose';

// Investor interface
export interface IInvestor extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
  investmentAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Investor schema
const investorSchema = new Schema<IInvestor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    investmentAmount: { type: Number },
  },
  { timestamps: true }
);

// Create and export the Investor model
const Investor = mongoose.model<IInvestor>('Investor', investorSchema);

export default Investor;