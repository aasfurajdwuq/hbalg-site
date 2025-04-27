import { IStorage } from '../storage';
import { InsertUser, User } from '../../shared/schema';
import UserModel from './models/User';
import ContactModel, { IContact } from './models/Contact';
import InvestorModel, { IInvestor } from './models/Investor';
import { log } from '../vite';

export class MongoStorage implements IStorage {
  private counter: number = 0;

  constructor() {
    // Initialize the counter by checking the highest ID in the database
    this.initializeCounter();
  }

  private async initializeCounter(): Promise<void> {
    try {
      const highestIdUser = await UserModel.findOne().sort('-id').exec();
      if (highestIdUser) {
        this.counter = highestIdUser.id + 1;
      }
      log(`MongoStorage initialized with counter: ${this.counter}`, 'mongodb');
    } catch (error) {
      log(`Error initializing counter: ${error}`, 'mongodb');
      this.counter = 1;
    }
  }

  private getNextId(): number {
    return this.counter++;
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ id }).exec();
      if (!user) return undefined;
      
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        fullName: user.fullName
      };
    } catch (error) {
      log(`Error getting user by ID: ${error}`, 'mongodb');
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username }).exec();
      if (!user) return undefined;
      
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        fullName: user.fullName
      };
    } catch (error) {
      log(`Error getting user by username: ${error}`, 'mongodb');
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const id = this.getNextId();
      const user = new UserModel({
        id,
        username: insertUser.username,
        email: insertUser.email,
        password: insertUser.password,
        fullName: insertUser.fullName
      });
      
      await user.save();
      
      return {
        id,
        username: user.username,
        email: user.email,
        password: user.password,
        fullName: user.fullName
      };
    } catch (error) {
      log(`Error creating user: ${error}`, 'mongodb');
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  // Contact form methods
  async saveContact(contact: Omit<IContact, 'createdAt' | 'updatedAt'>): Promise<IContact> {
    try {
      const newContact = new ContactModel(contact);
      return await newContact.save();
    } catch (error) {
      log(`Error saving contact form: ${error}`, 'mongodb');
      throw new Error(`Failed to save contact form: ${error}`);
    }
  }

  async getContacts(): Promise<IContact[]> {
    try {
      return await ContactModel.find().sort('-createdAt').exec();
    } catch (error) {
      log(`Error getting contacts: ${error}`, 'mongodb');
      return [];
    }
  }

  // Investor form methods
  async saveInvestor(investor: Omit<IInvestor, 'createdAt' | 'updatedAt'>): Promise<IInvestor> {
    try {
      const newInvestor = new InvestorModel(investor);
      return await newInvestor.save();
    } catch (error) {
      log(`Error saving investor inquiry: ${error}`, 'mongodb');
      throw new Error(`Failed to save investor inquiry: ${error}`);
    }
  }

  async getInvestors(): Promise<IInvestor[]> {
    try {
      return await InvestorModel.find().sort('-createdAt').exec();
    } catch (error) {
      log(`Error getting investors: ${error}`, 'mongodb');
      return [];
    }
  }
}