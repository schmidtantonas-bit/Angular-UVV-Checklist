import { defineConfig } from 'vitest/config';

// Angular's Vitest runner defaults can hang on some Windows/WSL setups with thread pools.
// Using a single fork keeps the run stable and ensures the process exits.
export default defineConfig({
  test: {
    environment: 'jsdom',
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  }
});

