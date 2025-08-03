import { jest } from '@jest/globals';

// Silence MongoDB connection logs during tests
jest.mock('../config/db.js', () => ({
  connectDB: jest.fn().mockResolvedValue(true)
}));