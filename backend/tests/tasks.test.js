import request from 'supertest';
import app from '../app.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

describe('Task API Endpoints', () => {
  let authToken;
  const testUser = {
    name: 'Task Test User',
    email: `taskuser${Date.now()}@example.com`,
    password: 'password123'
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany({});
    await Task.deleteMany({});
    
    await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(testUser);
    
    authToken = loginRes.body.token;
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          dueDate: '2023-12-31'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe('Test Task');
      expect(res.body.completed).toBe(false);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task'
        });
      
      expect(res.statusCode).toEqual(401);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/title.*required/i);
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for user', async () => {
      await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task 1' });
      
      await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task 2' });

      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(2);
    });

    it('should return empty array for new user', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .get('/api/tasks');
      
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Task to Update' });
      taskId = res.body._id;
    });

    it('should update a task', async () => {
      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Task',
          completed: true
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Updated Task');
      expect(res.body.completed).toBe(true);
    });

    it('should validate task ownership', async () => {
      const anotherUser = {
        name: 'Another User',
        email: `another${Date.now()}@example.com`,
        password: 'password123'
      };
      
      await request(app)
        .post('/api/auth/register')
        .send(anotherUser);
      
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send(anotherUser);
      
      const anotherToken = loginRes.body.token;

      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${anotherToken}`)
        .send({ title: 'Should Not Update' });
      
      expect([401, 403]).toContain(res.statusCode);
      expect(res.body.message).toMatch(/not authorized/i);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Task to Delete' });
      taskId = res.body._id;
    });

    it('should delete a task', async () => {
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toMatch(/(deleted|removed)/i);

      const task = await Task.findById(taskId);
      expect(task).toBeNull();
    });
  });
});