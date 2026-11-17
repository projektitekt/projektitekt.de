import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
	testDir: 'tests',
	forbidOnly: !!process.env.CI,
	use: { baseURL: `http://localhost:${PORT}` },
	projects: [{ name: 'chromium', use: devices['Desktop Chrome'] }],
	webServer: {
		command: `node tests/pages-server.js build ${PORT}`,
		port: PORT
	}
});
