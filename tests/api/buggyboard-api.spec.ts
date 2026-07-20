import { test, expect } from '@playwright/test';

const API_BASE_URL = 'http://localhost:3000';

test.describe('BuggyBoard REST API', () => {
  
  test('GET /api/health', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.database).toBe('connected');
  });

  test.describe('POST /api/login', () => {
    test('Successful login', async ({ request }) => {
      const response = await request.post(`${API_BASE_URL}/api/login`, {
        data: { username: 'buggy', password: '1970beetle' }
      });
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.username).toBe('buggy');
    });

    test('Invalid credentials', async ({ request }) => {
      const response = await request.post(`${API_BASE_URL}/api/login`, {
        data: { username: 'buggy', password: 'wrongpassword' }
      });
      expect(response.status()).toBe(401);
    });
  });

  test.describe('Bug Management', () => {
    let bugId: number;

    test.beforeEach(async ({ request }) => {
      // Create a bug for tests that need one
      const response = await request.post(`${API_BASE_URL}/api/bugs`, {
        data: { title: 'Test Bug', severity: 'high', owner: 'tester', description: 'Test description' }
      });
      const bug = await response.json();
      bugId = bug.id;
    });

    test.afterEach(async ({ request }) => {
      // Cleanup
      await request.delete(`${API_BASE_URL}/api/bugs/${bugId}`);
    });

    test('GET /api/bugs', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/api/bugs`);
      expect(response.status()).toBe(200);
      const bugs = await response.json();
      expect(Array.isArray(bugs)).toBe(true);
    });

    test('GET /api/bugs/:id', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/api/bugs/${bugId}`);
      expect(response.status()).toBe(200);
      const bug = await response.json();
      expect(bug.id).toBe(bugId);
    });

    test('PUT /api/bugs/:id', async ({ request }) => {
      const response = await request.put(`${API_BASE_URL}/api/bugs/${bugId}`, {
        data: { title: 'Updated Title', severity: 'mid', owner: 'tester', description: 'Updated description', state: 'Open' }
      });
      expect(response.status()).toBe(200);
      const updatedBug = await response.json();
      expect(updatedBug.title).toBe('Updated Title');
    });

    test('DELETE /api/bugs/:id', async ({ request }) => {
      // We already have a bug in beforeEach, so let's delete it.
      const response = await request.delete(`${API_BASE_URL}/api/bugs/${bugId}`);
      expect(response.status()).toBe(204);
      
      // Verify it's gone
      const getResponse = await request.get(`${API_BASE_URL}/api/bugs/${bugId}`);
      expect(getResponse.status()).toBe(404);
    });
  });

  test('POST /api/bugs - Positive - Create a new bug', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/api/bugs`, {
      data: { title: 'New Bug', severity: 'low', owner: 'tester', description: 'New description' }
    });
    expect(response.status()).toBe(201);
    const bug = await response.json();
    expect(bug.title).toBe('New Bug');
    
    // Cleanup
    await request.delete(`${API_BASE_URL}/api/bugs/${bug.id}`);
  });

  test('POST /api/bugs - Negative - Blank title', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/api/bugs`, {
      data: { title: '', severity: 'high', owner: 'tester', description: 'Desc' }
    });
    expect(response.status()).toBe(400);
  });
});
