import React from "react";
import { render } from "@testing-library/react";
import {Form} from ".";

test('render check for loading page', () => {
    const {getByTestId} = render(<Form/>);
    getByTestId("form")
});
