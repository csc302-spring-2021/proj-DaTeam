import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ListFieldItem } from ".";
import { ListField } from "../ListField";
import { Mocks, Model } from "@dateam/shared";

export interface IOptionNode {
    listFieldItem: Model.SDCListFieldItem;
    listFieldItemChildren: JSX.Element[];
}

afterEach(cleanup);

describe("ListFieldItem", () => {
    const sdcListFieldItemP: Model.SDCListFieldItem = Mocks.genListFieldItemPartial();
    const sdcListFieldItemC: Model.SDCListFieldItem = Mocks.genListFieldItemComplete();

    it('renders without errors for a partial listfielditem', () => {
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
            listFieldItemChildren: [<div key="childdiv" data-testid="childdiv"></div>, <div key="childdiv2" data-testid="childdiv2"></div>]
        }
        const { getByTestId } = render(<ListFieldItem
            key={optionnode.listFieldItem.id}
            optionNode={optionnode}
            uncollaped={true}
            isMultiSelect={true}
          />);

        const childdiv: React.ReactNode = getByTestId("childdiv");
        expect(childdiv).toBeVisible();
    });

    it('renders listfield inside listfielditem', () => {
        const sdcListFieldC: Model.SDCListField = Mocks.genListFieldComplete();
        sdcListFieldItemC.id = sdcListFieldItemC.id + "1";
        const optionnodelistfield: IOptionNode = {
            listFieldItem: sdcListFieldItemC,
            listFieldItemChildren: []
        }
        const optionnode: IOptionNode = {
            listFieldItem: sdcListFieldItemC,
            listFieldItemChildren: [<ListField key={sdcListFieldC.id} sdcListField={sdcListFieldC} optionNodes={[optionnodelistfield]}></ListField>]
        }
        const { getByTestId } = render(<ListFieldItem
            key={optionnode.listFieldItem.id}
            optionNode={optionnode}
            uncollaped={true}
            isMultiSelect={true}
          />);
        expect(getByTestId("listfield")).toBeVisible();
    });
})
