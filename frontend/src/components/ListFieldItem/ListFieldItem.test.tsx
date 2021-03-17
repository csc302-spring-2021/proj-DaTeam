import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ListFieldItem } from ".";
import { Mocks, Model } from "@dateam/shared";

export interface IOptionNode {
    listFieldItem: Model.SDCListFieldItem;
    listFieldItemChildren: JSX.Element[];
}

afterEach(cleanup);

describe("ListFieldItem", () => {
    const sdcListFieldItemP: Model.SDCListFieldItem = Mocks.genListFieldItemPartial();
    const sdcListFieldItemC: Model.SDCListFieldItem = Mocks.genListFieldItemComplete();

    it("test", () => {
        
    });
    /*it('renders without errors for a partial listfielditem', () => {
        const optionnode: IOptionNode = {
            listFieldItem: sdcListFieldItemP,
            listFieldItemChildren: []
        }
        const { getByTestId } = render(<ListFieldItem
            key={optionnode.listFieldItem.id}
            optionNode={optionnode}
            uncollaped={true}
            isMultiSelect={true}
          />);
        expect(getByTestId("listfielditem")).toBeVisible();
    });


    it('renders without errors for a complete listfielditem', () => {
        const optionnode: IOptionNode = {
            listFieldItem: sdcListFieldItemC,
            listFieldItemChildren: []
        }
        const { getByTestId } = render(<ListFieldItem
            key={optionnode.listFieldItem.id}
            optionNode={optionnode}
            uncollaped={true}
            isMultiSelect={true}
          />);
        expect(getByTestId("listfielditem")).toBeVisible();
    });

    it('renders children without error', () => {
        const optionnode: IOptionNode = {
            listFieldItem: sdcListFieldItemC,
            listFieldItemChildren: [<div key="childdiv" data-testid="childdiv"></div>]
        }
        const { getByTestId } = render(<ListFieldItem
            key={optionnode.listFieldItem.id}
            optionNode={optionnode}
            uncollaped={true}
            isMultiSelect={true}
          />);

        const childdiv: React.ReactNode = getByTestId("childdiv");
        expect(childdiv).toBeVisible();
    });*/
})
