// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./test/server.js";
import mockConsole from "jest-mock-console";

let resetConsole;

// Establish API mocking before all tests.
beforeAll(() => {
  if (process.env.CI) resetConsole = mockConsole();
  server.listen({ onUnhandledRequest: "warn" });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => {
  if (process.env.CI) resetConsole();
  server.close();
});
