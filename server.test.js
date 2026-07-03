const request = require('supertest');
const app = require('./server');

describe('DevOps App - API Tests', () => {
  
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/').expect(200);
      expect(res.body.message).toBe('Welcome to DevOps App');
      expect(res.body.version).toBe('1.0.0');
    });
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health').expect(200);
      expect(res.body.status).toBe('healthy');
    });

    it('should include uptime', async () => {
      const res = await request(app).get('/health');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /ready', () => {
    it('should return ready status', async () => {
      const res = await request(app).get('/ready').expect(200);
      expect(res.body.ready).toBe(true);
    });
  });

  describe('GET /api/data', () => {
    it('should return sample data', async () => {
      const res = await request(app).get('/api/data').expect(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /metrics', () => {
    it('should return metrics', async () => {
      const res = await request(app).get('/metrics').expect(200);
      expect(res.text).toContain('http_requests_total');
    });
  });

  describe('GET /api/docs', () => {
    it('should return documentation', async () => {
      const res = await request(app).get('/api/docs').expect(200);
      expect(Array.isArray(res.body.endpoints)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for invalid endpoint', async () => {
      await request(app).get('/invalid').expect(404);
    });
  });

  describe('Response Format', () => {
    it('should return JSON responses', async () => {
      const endpoints = ['/', '/health', '/ready', '/api/data', '/api/docs'];
      for (const endpoint of endpoints) {
        const res = await request(app).get(endpoint);
        expect(res.get('Content-Type')).toMatch(/json/);
      }
    });
  });
});
