import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ListFieldItem } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("ListFieldItem", () => {
    const sdcListFieldItemP: Model.SDCListFieldItem = Mocks.genListFieldItemPartial();
    const sdcListFieldItemC: Model.SDCListFieldItem = Mocks.genListFieldItemComplete();

    it('renders without errors for a partial listfielditem', () => {
        const { getByTestId } = render(<ListFieldItem isSelected={false} isMultiSelect={false} sdcListFieldItem={sdcListFieldItemP} />);
        expect(getByTestId("listfielditem")).toBeVisible();
    });


    it('renders without errors for a complete listfielditem', () => {
        const { getByTestId } = render(<ListFieldItem isSelected={false} isMultiSelect={false} sdcListFieldItem={sdcListFieldItemC} />);
        expect(getByTestId("listfielditem")).toBeVisible();
    });

    it('renders children without error', () => {
        const { getByTestId } = render(
            <ListFieldItem isSelected={true} isMultiSelect={false} sdcListFieldItem={sdcListFieldItemC}>
                <ListFieldItem isSelected={true} isMultiSelect={false} sdcListFieldItem={sdcListFieldItemC}>
                    <ListFieldItem isSelected={true} isMultiSelect={false} sdcListFieldItem={sdcListFieldItemC}>
                        <ListFieldItem isSelected={true} isMultiSelect={false} sdcListFieldItem={sdcListFieldItemC}>
                        <div data-testid="childdiv">
                        </div>
                        </ListFieldItem>
                    </ListFieldItem>
                </ListFieldItem>
            </ListFieldItem>
        );

        const childdiv: React.ReactNode = getByTestId("childdiv");
        expect(childdiv).toBeVisible();
    });
})
