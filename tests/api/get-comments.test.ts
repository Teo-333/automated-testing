import { test, expect } from '@playwright/test';

test('GET /comments with postId parameter returns correct elements', async ({ request }) => {
  const parameter = 1;
  const response = await request.get('https://jsonplaceholder.typicode.com/comments', {
    params: { postId: parameter },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  for (const item of data) {
    expect(item.postId).toBe(parameter);
  }
});
