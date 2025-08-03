import request from 'supertest';
import app from '../app.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

describe('Auth API Endpoints', () => {
  const baseUser = {
    name: 'Test User',
    password: 'password123'
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany({});
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const res = await request(app)
        .post('/api/auth/register')
        .send({ ...baseUser, email: uniqueEmail });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('_id');
    });

    it('should reject duplicate email registration', async () => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      
      await request(app)
        .post('/api/auth/register')
        .send({ ...baseUser, email: uniqueEmail });
      
      const res = await request(app)
        .post('/api/auth/register')
        .send({ ...baseUser, email: uniqueEmail });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/already exists/i);
    });

    it('should validate required fields', async () => {
      const testCases = [
        { payload: { email: 'test@example.com', password: 'password123' }, missing: 'name' },
        { payload: { name: 'Test User', password: 'password123' }, missing: 'email' },
        { payload: { name: 'Test User', email: 'test@example.com' }, missing: 'password' }
      ];

      for (const testCase of testCases) {
        const res = await request(app)
          .post('/api/auth/register')
          .send(testCase.payload);
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toMatch(/required/i);
      }
    });

    it('should validate email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ ...baseUser, email: 'invalid-email' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/valid email/i);
    });
  });

  describe('POST /api/auth/login', () => {
    const testUser = {
      ...baseUser,
      email: `test${Date.now()}@example.com`
    };

    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser);
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('_id');
    });

    it('should reject invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });

    it('should reject non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });

    it('should validate required fields', async () => {
      const testCases = [
        { payload: { password: 'password123' }, missing: 'email' },
        { payload: { email: 'test@example.com' }, missing: 'password' }
      ];

      for (const testCase of testCases) {
        const res = await request(app)
          .post('/api/auth/login')
          .send(testCase.payload);
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toMatch(/required/i);
      }
    });
  });
});