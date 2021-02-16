import React from "react";
import { render } from "@testing-library/react";
import {Home} from "../Home";

test('render check for home page', () => {
    const {getByTestId} = render(<Home/>);
    getByTestId("home")
});
