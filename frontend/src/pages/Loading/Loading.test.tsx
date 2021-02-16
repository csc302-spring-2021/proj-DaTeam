import React from "react";
import { render } from "@testing-library/react";
import {Loading} from "../Loading";

test('render check for loading page', () => {
    const {getByTestId} = render(<Loading/>);
    getByTestId("loading")
});
