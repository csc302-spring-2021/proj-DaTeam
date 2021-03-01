import React from "react";
import { render } from "@testing-library/react";
import {ListFieldItem} from ".";
import { Mocks } from "@dateam/shared";

test('render check for partial display item component', () => {
    const {getByTestId} = render(<ListFieldItem sdcListFieldItem={Mocks.genListFieldItemPartial()}/>);
    getByTestId("listfielditem")
});


test('render check for complete display item component', () => {
    const {getByTestId} = render(<ListFieldItem sdcListFieldItem={Mocks.genListFieldItemComplete()}/>);
    getByTestId("listfielditem")
});