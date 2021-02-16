import React from "react";
import { render } from "@testing-library/react";
import {Responses} from "../Responses";

test('render check for responses page', () => {
    const {getByTestId} = render(<Responses/>);
    getByTestId("responses")
});
