import { createMemoryHistory, MemoryHistory } from "history";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GenericJsonSerializer, Mocks, Model } from "@dateam/shared";

import { Responses } from ".";

function renderResponses(): { history: MemoryHistory } {
  const queryClient = new QueryClient();
  const history = createMemoryHistory({
    initialEntries: ["/responses/manage"],
  });
  render(
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Responses />
      </Router>
    </QueryClientProvider>
  );

  return { history };
}

const server = setupServer(
  rest.get("/api/v1/patients/:patientId", (req, res, ctx) => {
    const patient1 = Mocks.genPatientComplete();
    patient1.uid = "patient1";
    const json = GenericJsonSerializer.encode(patient1, Model.Patient);
    return res(ctx.json(json));
  }),

  rest.get("/api/v1/forms", (req, res, ctx) => {
    const form1 = Mocks.buildFormSimpleList();
    form1.uid = "form1";
    const json = [GenericJsonSerializer.encode(form1, Model.SDCForm)];
    return res(ctx.json(json));
  }),

  rest.get("/api/v1/forms/:formId", (req, res, ctx) => {
    const form1 = Mocks.buildFormSimpleList();
    form1.uid = "form1";
    const json = GenericJsonSerializer.encode(form1, Model.SDCForm);
    return res(ctx.json(json));
  }),

  rest.get("/api/v1/forms/:formId/responses", (req, res, ctx) => {
    const response1 = Mocks.buildFormResponseSimpleList();
    response1.uid = "response1";
    response1.formId = "form1";
    response1.patientID = "patient1";
    const json = [
      GenericJsonSerializer.encode(response1, Model.SDCFormResponse),
    ];
    return res(ctx.json(json));
  }),

  rest.get("/api/v1/responses/:responseId", (req, res, ctx) => {
    const response1 = Mocks.buildFormResponseSimpleList();
    response1.uid = "response1";
    response1.formId = "form1";
    response1.patientID = "patient1";
    const json = GenericJsonSerializer.encode(response1, Model.SDCFormResponse);
    return res(ctx.json(json));
  })
);

describe("Responses", () => {
  // Setup/teardown API mocking for all tests in this scope
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders without error", () => {
    renderResponses();
    screen.getByTestId("responses");
  });

  it("navigates to a response", async () => {
    const { history } = renderResponses();

    await waitFor(() => screen.getByText(/ID: covid-19-test-.*/));
    fireEvent.click(screen.getByText(/ID: covid-19-test-.*/));
    await waitFor(() => screen.getByText(/Ujash/));
    fireEvent.click(screen.getByText("Ujash"));

    expect(history.location.pathname).toBe(
      "/responses/manage/form1/response/response1"
    );
  });

  it("navigates back when you close a panel", async () => {
    const { history } = renderResponses();

    await waitFor(() => screen.getByText(/ID: covid-19-test-.*/));
    fireEvent.click(screen.getByText(/ID: covid-19-test-.*/));
    await waitFor(() => screen.getByText(/Ujash/));
    fireEvent.click(screen.getByText("Ujash"));

    expect(history.location.pathname).toBe(
      "/responses/manage/form1/response/response1"
    );

    const closeButtons: HTMLElement[] = screen.getAllByLabelText("close");
    expect(closeButtons).toHaveLength(2);

    fireEvent.click(closeButtons[1]);

    expect(history.location.pathname).toBe("/responses/manage/form1");

    fireEvent.click(closeButtons[0]);

    expect(history.location.pathname).toBe("/responses/manage");
  });
});
