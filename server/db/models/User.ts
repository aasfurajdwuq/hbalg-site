import mongoose, { Document, Schema } from 'mongoose';

// User interface
export interface IUser extends Document {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const userSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
  },
  { timestamps: true }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;