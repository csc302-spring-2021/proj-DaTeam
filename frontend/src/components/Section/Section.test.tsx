import React from "react";
import { render } from "@testing-library/react";
import {Section} from ".";
import { genSectionPartial } from "@dateam/shared";

test('render check for section component', () => {
    const {getByTestId} = render(<Section sdcSection={genSectionPartial()}/>);
    getByTestId("section")
});
