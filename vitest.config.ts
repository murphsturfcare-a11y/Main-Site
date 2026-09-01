import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    // Claude Code worktrees live inside the repo; without this, a root
    // `vitest run` also collects every worktree's copy of the suite.
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
})
