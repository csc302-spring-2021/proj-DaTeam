import React from "react";
import { render, cleanup } from "@testing-library/react";
import { NewProcedureModel } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("DisplayItem", () => {
    const sdcDisplayitemC: Model.SDCDisplayItem = Mocks.genDisplayItemComplete()
    const sdcDisplayitemP: Model.SDCDisplayItem = Mocks.genDisplayItemPartial()

    it('renders without errors for complete newproceduremodel', () => {
        const { getByTestId } = render(<NewProcedureModel
            showModal={true}
        />);
        expect(getByTestId("newproceduremodel")).toBeVisible();
    });
});
