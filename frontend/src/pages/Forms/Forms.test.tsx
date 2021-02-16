import React from "react";
import { render } from "@testing-library/react";
import {Forms} from "../Forms";

test('render check for forms page', () => {
    const {getByTestId} = render(<Forms/>);
    getByTestId("forms")
});
