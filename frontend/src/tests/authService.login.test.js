import { vi, describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { authService } from '../services/authService';

// 1. Mock global.fetch before all tests
beforeAll(() => {
  global.fetch = vi.fn();
});

// 2. Clear mocks between tests
beforeEach(() => {
  global.fetch.mockClear();
});

describe('authService.login()', () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const testCredentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  // Helper function to create mock responses
  const createMockResponse = (ok, data) => ({
    ok,
    json: () => Promise.resolve(data),
  });

  it('should make a POST request to the login endpoint', async () => {
    // 3. Setup mock successful response
    const mockResponse = { token: 'test-token' };
    global.fetch.mockResolvedValue(createMockResponse(true, mockResponse));

    // 4. Call the login function
    await authService.login(testCredentials.email, testCredentials.password);

    // 5. Assertions
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testCredentials)
      }
    );
  });

  it('should return the token on successful login', async () => {
    const mockResponse = { token: 'test-token' };
    global.fetch.mockResolvedValue(createMockResponse(true, mockResponse));

    const result = await authService.login(testCredentials.email, testCredentials.password);
    
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when login fails', async () => {
    const errorMessage = 'Invalid credentials';
    global.fetch.mockResolvedValue(createMockResponse(false, { message: errorMessage }));

    // 6. Expect the async function to reject
    await expect(authService.login(testCredentials.email, 'wrong-password'))
      .rejects.toThrow(errorMessage);
  });

  it('should throw a generic error when no message is provided', async () => {
    global.fetch.mockResolvedValue(createMockResponse(false, {}));

    await expect(authService.login(testCredentials.email, 'wrong-password'))
      .rejects.toThrow('Login failed');
  });
});