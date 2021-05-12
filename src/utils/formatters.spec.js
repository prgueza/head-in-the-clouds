import dayjs from "dayjs";
import { withUnits, asDate } from "./formatters";

describe("Formatters helpers test suite", () => {
  describe("Formatter withUnits is used for displaying values alongside ther units", () => {
    test.each([
      [15, "kg", "15 kg"],
      [0, "mm", "0 mm"],
      [10, undefined, "10"],
      [undefined, "km", "- km"],
      [undefined, undefined, "-"],
    ])(
      "If value is %s and units is %s the result is %s",
      (value, units, expected) => {
        const result = withUnits(value, units);
        expect(result).toBe(expected);
      }
    );
  });

  describe("Formatter asDate is used for displaying dates in a specific format", () => {
    test("Default output format is 'MMMM D, YYYY'", () => {
      const result = asDate("2020-01-01T12:00:00Z");
      expect(result).toBe("January 1, 2020");
    });

    test("Other valid output formats can be used such as 'dddd'", () => {
      const result = asDate("2020-01-01T12:00:00Z", "dddd");
      expect(result).toBe("Wednesday");
    });

    test("Invalid or undefined dates return '-'", () => {
      const invalidResult = asDate("invalid date", "dddd");
      const undefinedResult = asDate(undefined, "dddd");
      expect(invalidResult).toBe("-");
      expect(undefinedResult).toBe("-");
    });
  });
});
