import debouncer from "./debounce";

describe("Debounce function test suite", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("The debounced function is only called once withen a 300ms interval", () => {
    const fn = jest.fn();
    const debouncedFn = debouncer(fn);
    debouncedFn();
    jest.advanceTimersByTime(100);
    debouncedFn();
    jest.advanceTimersByTime(100);
    debouncedFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("Invocations to the debounced function after 300ms are processed", () => {
    const fn = jest.fn();
    const debouncedFn = debouncer(fn);
    debouncedFn();
    jest.advanceTimersByTime(400);
    debouncedFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
