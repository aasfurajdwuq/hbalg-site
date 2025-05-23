import { users, type User, type InsertUser } from "@shared/schema";

// Contact and Investor interfaces (simplified versions of the MongoDB models)
export interface Contact {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Investor extends Contact {
  company?: string;
  investmentAmount?: number;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  saveContact(contact: Contact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Investor methods
  saveInvestor(investor: Investor): Promise<Investor>;
  getInvestors(): Promise<Investor[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Contact[] = [];
  private investors: Investor[] = [];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact methods
  async saveContact(contact: Contact): Promise<Contact> {
    const newContact: Contact = {
      ...contact,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contacts.push(newContact);
    return newContact;
  }
  
  async getContacts(): Promise<Contact[]> {
    return [...this.contacts].sort((a, b) => {
      const dateA = a.createdAt ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt ? b.createdAt.getTime() : 0;
      return dateB - dateA; // Sort in descending order (newest first)
    });
  }
  
  // Investor methods
  async saveInvestor(investor: Investor): Promise<Investor> {
    const newInvestor: Investor = {
      ...investor,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.investors.push(newInvestor);
    return newInvestor;
  }
  
  async getInvestors(): Promise<Investor[]> {
    return [...this.investors].sort((a, b) => {
      const dateA = a.createdAt ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt ? b.createdAt.getTime() : 0;
      return dateB - dateA; // Sort in descending order (newest first)
    });
  }
}

// Create and export an instance of the storage implementation
export const storage = new MemStorage();
