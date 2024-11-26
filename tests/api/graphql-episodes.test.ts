import { test, expect } from '@playwright/test';

test('GraphQL query retrieves episodes with "Rick" in the title', async ({ request }) => {
  const query = `
    query {
      episodes(filter: { name: "rick" }) {
        results {
          name
        }
      }
    }
  `;
  const response = await request.post('https://rickandmortyapi.com/graphql', {
    data: { query },
  });
  expect(response.status()).toBe(200);

  const result = await response.json();
  const episodes = result.data.episodes.results;

  expect(episodes.length).toBeGreaterThan(0);

  for (const episode of episodes) {
    console.log(episode.name); // For debugging purposes
    expect(episode.name.toLowerCase()).toContain('rick');
  }
});
