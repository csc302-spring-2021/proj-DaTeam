import React from "react";
import { render } from "@testing-library/react";
import {DisplayItem} from ".";
import { genDisplayItemPartial } from "@dateam/shared";

test('render check for display item component', () => {
    const {getByTestId} = render(<DisplayItem sdcDisplayitem={genDisplayItemPartial()}/>);
    getByTestId("displayitem")
});
