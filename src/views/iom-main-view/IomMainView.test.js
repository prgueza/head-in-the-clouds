import { render, screen } from "@testing-library/react";
import IomMainView from "./IomMainView";

test("renders learn react link", () => {
  render(<IomMainView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
