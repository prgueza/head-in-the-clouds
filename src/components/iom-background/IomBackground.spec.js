import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IomBackground from "./IomBackground";

describe("IomBackground test suite", () => {
  render(<IomBackground />);
  const clouds = screen.getAllByTestId("cloud");

  test("All 4 cloud get rendered within the component", () => {
    expect(clouds.length).toBe(4);
  });

  test("Clouds have the 'cloud' class which enables the CSS animation", () => {
    expect(clouds.every((cloud) => cloud.classList.contains("cloud"))).toBe(
      true
    );
  });
});
