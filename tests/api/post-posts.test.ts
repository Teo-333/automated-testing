import { test, expect } from '@playwright/test';

test('POST /posts creates a new post and returns the expected response', async ({ request }) => {
  const payload = { title: 'test title', body: 'test body', userId: 1 };
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: payload,
  });
  expect(response.status()).toBe(201);
  const data = await response.json();
  expect(data).toEqual({ id: 101, ...payload });
});
