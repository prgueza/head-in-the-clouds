import { configure } from "enzyme";
import { server } from "./test/server.js";
import Adapter from "enzyme-adapter-react-16";
import mockConsole from "jest-mock-console";

// Enzyme configuration
configure({ adapter: new Adapter() });

let resetConsole;

// Establish API mocking before all tests.
beforeAll(() => {
  // In CI environments disabling the console makes reading results easier.
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
