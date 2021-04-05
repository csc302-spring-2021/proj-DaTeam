import React from "react";
import { Procedures } from "../Procedures";
import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GenericJsonSerializer, Mocks, Model } from "@dateam/shared";
import { QueryClient, QueryClientProvider } from "react-query";

function renderProcedures(initialEntries = ["/procedures"]): { history: MemoryHistory } {
    const queryClient = new QueryClient();

    const history = createMemoryHistory({ initialEntries });
    render(
        <QueryClientProvider client={queryClient}>
            <Router history={history}>
                <Procedures />
            </Router>
        </QueryClientProvider>
    );

    return { history };
}

const server = setupServer(
    rest.get("/api/v1/procedures", (req, res, ctx) => {
        const form1 = Mocks.genPatientComplete();
        form1.uid = "patient1";
        const json = [GenericJsonSerializer.encode(form1, Model.Patient)];
        return res(ctx.json(json));
    })
);

describe("Procedures", () => {
    // Setup/teardown API mocking for all tests in this scope
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("renders procedures", async () => {
        renderProcedures();
        await waitFor(() => expect(screen.getByTestId("procedures")).toBeVisible());

    });
});