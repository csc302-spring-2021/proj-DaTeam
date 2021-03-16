import { createMemoryHistory, MemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router";

import { Responses } from ".";

function renderResponses(): { history: MemoryHistory } {
  const history = createMemoryHistory({ initialEntries: ["/responses"] });
  render(
    <Router history={history}>
      <Responses />
    </Router>
  );

  return { history };
}

describe("Responses", () => {
  it("renders without error", () => {
    renderResponses();
    screen.getByTestId("responses");
  });

  it("navigates to a response", () => {
    const { history } = renderResponses();

    fireEvent.click(screen.getByText("ID: 1"));
    fireEvent.click(screen.getByText("Arnav"));

    expect(history.location.pathname).toBe("/responses/1/1");
  });

  it("navigates back when you close a panel", () => {
    const { history } = renderResponses();

    fireEvent.click(screen.getByText("ID: 1"));
    fireEvent.click(screen.getByText("Arnav"));

    expect(history.location.pathname).toBe("/responses/1/1");

    const closeButtons: HTMLElement[] = screen.getAllByLabelText("close");
    expect(closeButtons).toHaveLength(2);

    fireEvent.click(closeButtons[1]);

    expect(history.location.pathname).toBe("/responses/1");

    fireEvent.click(closeButtons[0]);

    expect(history.location.pathname).toBe("/responses");
  });
});
