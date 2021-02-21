import React from "react";
import { render } from "@testing-library/react";
import {DisplayItem} from ".";
import { Mocks } from "@dateam/shared";

test('render check for display item component', () => {
    const {getByTestId} = render(<DisplayItem sdcDisplayitem={Mocks.genDisplayItemPartial()}/>);
    getByTestId("displayitem")
});
