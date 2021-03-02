import React from "react";
import { render } from "@testing-library/react";
import {ListField} from ".";
import { Mocks } from "@dateam/shared";

test('render check for partial display item component', () => {
    const {getByTestId} = render(<ListField optionNodes={[]} sdcListField={Mocks.genListFieldPartial()}/>);
    getByTestId("listfield")
});


test('render check for complete display item component', () => {
    const {getByTestId} = render(<ListField optionNodes={[]} sdcListField={Mocks.genListFieldComplete()}/>);
    getByTestId("listfield")
});