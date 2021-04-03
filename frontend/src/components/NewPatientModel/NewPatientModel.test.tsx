import React from "react";
import { render, cleanup } from "@testing-library/react";
import { NewPatientModel } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("DisplayItem", () => {
    const sdcDisplayitemC: Model.SDCDisplayItem = Mocks.genDisplayItemComplete()
    const sdcDisplayitemP: Model.SDCDisplayItem = Mocks.genDisplayItemPartial()

    it('renders without errors for complete newpatientmodel', () => {
        const { getByTestId } = render(<NewPatientModel
            showModal={true}
            goToRespones={false}
        />);
        expect(getByTestId("newpatientmodel")).toBeVisible();
    });
});
