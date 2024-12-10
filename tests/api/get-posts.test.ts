import { test, expect } from '@playwright/test';

test('GET /posts returns an array with elements', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});
