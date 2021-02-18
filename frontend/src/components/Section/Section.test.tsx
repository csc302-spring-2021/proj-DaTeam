import React from "react";
import { render } from "@testing-library/react";
import {Section} from ".";

test('render check for section component', () => {
    const {getByTestId} = render(<Section/>);
    getByTestId("section")
});
