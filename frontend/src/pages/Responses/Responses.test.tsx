import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router";

import { Responses } from "../Responses";

describe("Responses", () => {
  it("renders without error", () => {
    render(
      <MemoryRouter initialEntries={["/responses"]}>
        <Responses />
      </MemoryRouter>
    );
    screen.getByTestId("responses");
  });

  it("navigates to a response", () => {
    const history = createMemoryHistory({ initialEntries: ["/responses"] });
    render(
      <Router history={history}>
        <Responses />
      </Router>
    );

    fireEvent.click(screen.getByText("ID: 1"));
    fireEvent.click(screen.getByText("Arnav"));

    expect(history.location.pathname).toBe("/responses/1/1");
  });

  it("navigates back when you close a panel", () => {
    const history = createMemoryHistory({ initialEntries: ["/responses"] });
    render(
      <Router history={history}>
        <Responses />
      </Router>
    );

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
