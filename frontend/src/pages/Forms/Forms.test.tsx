import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router";

import { Forms } from ".";

function renderForms(): { history: MemoryHistory } {
  const history = createMemoryHistory({ initialEntries: ["/responses"] });
  render(
    <Router history={history}>
      <Forms />
    </Router>
  );

  return { history };
}

test("render check for forms page", () => {
  renderForms();
  screen.getByTestId("forms");
});
