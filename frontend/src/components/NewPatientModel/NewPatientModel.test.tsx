import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { NewPatientModel } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("DisplayItem", () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);

    it('renders without errors for complete newpatientmodel', () => {
        const { getByTestId } = render(
            <Router history={history}>
                <NewPatientModel
                    showModal={true}
                    goToRespones={false}
                />
            </Router>,
        );
        expect(getByTestId("newpatientmodel")).toBeVisible();
    });
});
