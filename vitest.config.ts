import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.test.ts",
        "vitest.config.ts",
      ],
    },
  },
});
