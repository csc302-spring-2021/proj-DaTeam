import React from "react";
import { Patients } from "../Patients";
import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GenericJsonSerializer, Mocks, Model } from "@dateam/shared";
import { QueryClient, QueryClientProvider } from "react-query";

function renderPatients(initialEntries = ["/patients"]): { history: MemoryHistory } {
    const queryClient = new QueryClient();

    const history = createMemoryHistory({ initialEntries });
    render(
        <QueryClientProvider client={queryClient}>
            <Router history={history}>
                <Patients />
            </Router>
        </QueryClientProvider>
    );

    return { history };
}

const server = setupServer(
    rest.get("/api/v1/patients", (req, res, ctx) => {
        const form1 = Mocks.genPatientComplete();
        form1.uid = "patient1";
        const json = [GenericJsonSerializer.encode(form1, Model.Patient)];
        return res(ctx.json(json));
    })
);

describe("Patients", () => {
    // Setup/teardown API mocking for all tests in this scope
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("renders patients", async () => {
        renderPatients();
        expect(screen.getByTestId("patients")).toBeVisible();
    });
});