import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		alias: {
			"~/": "/src/",
		},
		setupFiles: ["./tests/utils/setup.ts"],
		sequence: {
			setupFiles: "list",
		},
		hookTimeout: 60000,
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["html"],
		},
	},
});
