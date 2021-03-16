import { createMemoryHistory, MemoryHistory } from "history";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GenericJsonSerializer, Mocks, Model } from "@dateam/shared";

import { Forms } from ".";

function renderForms(initialEntries = ["/forms"]): { history: MemoryHistory } {
  const history = createMemoryHistory({ initialEntries });
  render(
    <Router history={history}>
      <Forms />
    </Router>
  );

  return { history };
}

const server = setupServer(
  // capture "GET /forms/<id>" requests
  rest.get("/api/v1/forms/:formId", (req, res, ctx) => {
    // respond using a mocked JSON body
    const form1 = Mocks.buildFormSimpleList();
    const json = GenericJsonSerializer.encode(form1, Model.SDCForm);
    return res(ctx.json(json));
  })
);

describe("Forms", () => {
  // Setup/teardown API mocking for all tests in this scope
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders forms", () => {
    renderForms();
    screen.getByTestId("forms");

    screen.getByText("ID: 1");
    screen.getByText("Pancreatic Cancer Biopsy");
  });

  it("navigates to a form", async () => {
    const { history } = renderForms();

    fireEvent.click(screen.getByText("ID: 1"));

    await waitFor(() => screen.getByTestId("structure"));

    expect(history.location.pathname).toBe("/forms/1");
  });

  it("navigates back when you close panel", async () => {
    const { history } = renderForms(["/forms/1"]);

    await waitFor(() => screen.getByLabelText("close"));

    fireEvent.click(screen.getByLabelText("close"));

    expect(history.location.pathname).toBe("/forms");
  });

  it("renders form structure", async () => {
    renderForms(["/forms/1"]);

    await waitFor(() => screen.getByText("List"));
  });
});
