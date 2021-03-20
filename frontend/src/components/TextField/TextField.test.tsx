import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { TextField } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("TextField", () => {
    const sdcTextField: Model.SDCTextField = Mocks.genTextFieldPartial();

    it('renders without error', () => {
        const { getByTestId } = render(<TextField sdcTextField={sdcTextField} />);
        expect(getByTestId("textfield")).toBeVisible();
    });

    it('accepts text user input', () => {
        const { getByTestId } = render(<TextField sdcTextField={sdcTextField} />);
        const input: Element | Node | Document | Window = getByTestId("form-input")
        fireEvent.change(input, { target: { value: "testing" } });
        expect(input).toHaveValue("testing");
    });

    it('accepts number user input', () => {
        const { getByTestId } = render(<TextField sdcTextField={sdcTextField} />);
        const input: Element | Node | Document | Window = getByTestId("form-input");
        fireEvent.change(input, { target: { value: "9" } });
        expect(input).toHaveValue("9");
    });

    it('renders children without error', () => {
        const { getByTestId } = render(
            <TextField sdcTextField={sdcTextField}>
                <TextField sdcTextField={sdcTextField}>
                    <TextField sdcTextField={sdcTextField}>
                        <div data-testid="childdiv">
                        </div>
                    </TextField>
                </TextField>
            </TextField>
        );

        const childdiv: React.ReactNode = getByTestId("childdiv");
        expect(childdiv).toBeVisible();
    });

})
