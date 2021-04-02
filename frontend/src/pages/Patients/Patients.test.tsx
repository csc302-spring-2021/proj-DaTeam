import React from "react";
import { render } from "@testing-library/react";
import { Patients } from "../Patients";

test('render check for Patients page', () => {
    const { getByTestId } = render(<Patients />);
    getByTestId("Patients")
});
