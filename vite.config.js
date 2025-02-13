import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true, // Enables global functions like "test" and "expect"
        environment: "jsdom", // Simulates the browser environment
        setupFiles: "./src/setupTests.js", // Optional setup file,
    },
});
