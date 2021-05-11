import React from "react";
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IomDeleteConfirmation from "./IomDeleteConfirmation";

describe("IomDeleteConfirmation test suite", () => {
  const confirmMockFn = jest.fn();

  test(":text | The component renders the text passed as prop", () => {
    render(
      <IomDeleteConfirmation
        text="sample-text"
        isLoading={false}
        onConfirm={confirmMockFn}
      />
    );
    const text = screen.getByText("sample-text");
    expect(text).toBeInTheDocument();
  });

  test(":isLoading | Upon clicking on the button the onConfirm method passed as a prop gets executed", () => {
    render(
      <IomDeleteConfirmation
        text="sample-text"
        isLoading={false}
        onConfirm={confirmMockFn}
      />
    );
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(confirmMockFn).toHaveBeenCalled();
  });
});
