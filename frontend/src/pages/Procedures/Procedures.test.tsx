import React from "react";
import { render } from "@testing-library/react";
import { Procedures } from "../Procedures";

test('render check for Procedures page', () => {
    const { getByTestId } = render(<Procedures />);
    getByTestId("Procedures")
});
