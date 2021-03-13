import React from "react";
import { render, cleanup } from "@testing-library/react";
import { DisplayItem } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("DisplayItem", () => {
    const sdcDisplayitemC: Model.SDCDisplayItem = Mocks.genDisplayItemComplete()
    const sdcDisplayitemP: Model.SDCDisplayItem = Mocks.genDisplayItemPartial()

    it('renders without errors for complete displayitem', () => {
        const { getByTestId } = render(<DisplayItem sdcDisplayitem={sdcDisplayitemC} />);
        expect(getByTestId("displayitem")).toBeVisible();
    });

    it('renders without errors for partial displayitem', () => {
        const { getByTestId } = render(<DisplayItem sdcDisplayitem={sdcDisplayitemP} />);
        expect(getByTestId("displayitem")).toBeVisible();
    });

    it('displays text from sdcnode', () => {
        const { getByTestId } = render(<DisplayItem sdcDisplayitem={sdcDisplayitemC} />);
        const title: any = sdcDisplayitemC.title;
        expect(getByTestId("displayitem")).toHaveTextContent(title);
    });
});
