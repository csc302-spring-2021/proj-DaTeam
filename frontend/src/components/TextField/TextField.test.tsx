import React from "react";
import { render } from "@testing-library/react";
import {TextField} from ".";
import { Mocks } from "@dateam/shared";

test('render check for display item component', () => {
    const {getByTestId} = render(<TextField sdcTextField={Mocks.genTextFieldPartial()}/>);
    getByTestId("textfield")
});
