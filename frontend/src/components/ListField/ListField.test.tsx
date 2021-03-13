import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ListField } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("ListField", () => {
    const sdcListFieldC: Model.SDCListField = Mocks.genListFieldComplete()
    const sdcListFieldP: Model.SDCListField = Mocks.genListFieldPartial();
    it('renders without errors for a partial listfield', () => {
        const { getByTestId } = render(<ListField optionNodes={[]} sdcListField={sdcListFieldP} />);
        expect(getByTestId("listfield")).toBeVisible();
    });


    it('renders without errors for a complete listfield', () => {
        const { getByTestId } = render(<ListField optionNodes={[]} sdcListField={sdcListFieldC} />);
        expect(getByTestId("listfield")).toBeVisible();
    });

    it('renders children without error', () => {
        const { getByTestId } = render(
            <ListField optionNodes={[]} sdcListField={sdcListFieldC}>
                <ListField optionNodes={[]} sdcListField={sdcListFieldC}>
                    <ListField optionNodes={[]} sdcListField={sdcListFieldC}>
                        <ListField optionNodes={[]} sdcListField={sdcListFieldC}>
                            <div data-testid="childdiv">
                            </div>
                        </ListField>
                    </ListField>
                </ListField>
            </ListField>
        );

        const childdiv: React.ReactNode = getByTestId("childdiv");
        expect(childdiv).toBeVisible();
    });
})
