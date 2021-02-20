import React from "react";
import { render } from "@testing-library/react";
import {Section} from ".";
import { Mocks } from "@dateam/shared";

test('render check for section component', () => {
    const {getByTestId} = render(<Section sdcSection={Mocks.genSectionPartial()}/>);
    getByTestId("section")
});
