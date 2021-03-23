import { createMemoryHistory, MemoryHistory } from "history";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GenericJsonSerializer, Mocks, Model } from "@dateam/shared";

import { Forms } from ".";
import { QueryClient, QueryClientProvider } from "react-query";

function renderForms(initialEntries = ["/forms"]): { history: MemoryHistory } {
  const queryClient = new QueryClient();

  const history = createMemoryHistory({ initialEntries });
  render(
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Forms />
      </Router>
    </QueryClientProvider>
  );

  return { history };
}

const server = setupServer(
  rest.get("/api/v1/forms/:formId", (req, res, ctx) => {
    const form1 = Mocks.buildFormSimpleList();
    const json = GenericJsonSerializer.encode(form1, Model.SDCForm);
    return res(ctx.json(json));
  }),

  rest.get("/api/v1/forms", (req, res, ctx) => {
    const form1 = Mocks.buildFormSimpleList();
    form1.uid = "form1";
    const json = [GenericJsonSerializer.encode(form1, Model.SDCForm)];
    return res(ctx.json(json));
  })
);

describe("Forms", () => {
  // Setup/teardown API mocking for all tests in this scope
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders forms", async () => {
    renderForms();
    screen.getByTestId("forms");

    await waitFor(() => screen.getByText(/ID: covid-19-test-.*/));
    await waitFor(() => screen.getByText(/Covid19Test/));
  });

  it("navigates to a form", async () => {
    const { history } = renderForms();

    await waitFor(() => screen.getByText(/ID: covid-19-test-.*/));
    fireEvent.click(screen.getByText(/ID: covid-19-test-.*/));
    await waitFor(() => screen.getByTestId("structure"));

    expect(history.location.pathname).toBe("/forms/form1");
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
