import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "../../App";


test('render check for nav component', () => {
    const {getByTestId} = render(<App />);
    getByTestId("nav")
});

test('menu items', () => {
    const {getByTestId} = render(<App />);
    getByTestId("nav");

    fireEvent.click(getByTestId("menu-btn-responses"));
    fireEvent.click(getByTestId("menu-btn-search"));
    fireEvent.click(getByTestId("menu-btn-forms"));
    fireEvent.click(getByTestId("menu-btn-home"));
});
