const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoints', () => {
  describe('GET /health', () => {
    test('should return 200 status code', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
    });

    test('should return healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('healthy');
    });

    test('should include timestamp', async () => {
      const response = await request(app).get('/health');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.timestamp).toBe('string');
    });

    test('should include environment', async () => {
      const response = await request(app).get('/health');
      expect(response.body).toHaveProperty('environment');
    });

    test('should include uptime', async () => {
      const response = await request(app).get('/health');
      expect(response.body).toHaveProperty('uptime');
      expect(typeof response.body.uptime).toBe('number');
    });

    test('should have correct content type', async () => {
      const response = await request(app).get('/health');
      expect(response.type).toBe('application/json');
    });
  });
});

describe('API Data Endpoints', () => {
  describe('GET /api/data', () => {
    test('should return 200 status code', async () => {
      const response = await request(app).get('/api/data');
      expect(response.status).toBe(200);
    });

    test('should return correct message', async () => {
      const response = await request(app).get('/api/data');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('CI/CD Pipeline Working!');
    });

    test('should include version', async () => {
      const response = await request(app).get('/api/data');
      expect(response.body).toHaveProperty('version');
      expect(typeof response.body.version).toBe('string');
    });

    test('should include timestamp', async () => {
      const response = await request(app).get('/api/data');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});

describe('User Endpoints', () => {
  describe('GET /api/users', () => {
    test('should return 200 status code', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
    });

    test('should return array of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    test('should return correct number of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.body.users.length).toBeGreaterThan(0);
    });

    test('should include count', async () => {
      const response = await request(app).get('/api/users');
      expect(response.body).toHaveProperty('count');
    });

    test('should have valid user structure', async () => {
      const response = await request(app).get('/api/users');
      const user = response.body.users[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });
});

describe('Error Handling', () => {
  describe('404 Not Found', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.status).toBe(404);
    });

    test('should return error response', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Not Found');
    });

    test('should include helpful message', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });
});

describe('Content Type Headers', () => {
  test('health endpoint should return JSON', async () => {
    const response = await request(app).get('/health');
    expect(response.type).toBe('application/json');
  });

  test('api/data endpoint should return JSON', async () => {
    const response = await request(app).get('/api/data');
    expect(response.type).toBe('application/json');
  });

  test('api/users endpoint should return JSON', async () => {
    const response = await request(app).get('/api/users');
    expect(response.type).toBe('application/json');
  });
});

describe('Integration Tests', () => {
  test('should handle multiple sequential requests', async () => {
    const res1 = await request(app).get('/health');
    const res2 = await request(app).get('/api/data');
    const res3 = await request(app).get('/api/users');

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
    expect(res3.status).toBe(200);
  });

  test('should handle concurrent requests', async () => {
    const requests = Array(5).fill(null).map(() => request(app).get('/health'));
    const responses = await Promise.all(requests);

    responses.forEach(response => {
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
    });
  });
});
