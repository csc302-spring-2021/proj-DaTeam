import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Section } from ".";
import { Mocks, Model } from "@dateam/shared";

afterEach(cleanup);

describe("Section", () => {
    const sdcSection: Model.SDCSection = Mocks.genSectionPartial();
    it('renders without error', () => {
        const { getByTestId } = render(<Section sdcSection={sdcSection} />);
        const section: React.ReactNode = getByTestId("section");
        expect(section).toBeVisible();
    });

    it('renders children without error', () => {
        const { getByTestId } = render(
            <Section sdcSection={sdcSection}>
                <Section sdcSection={sdcSection}>
                    <Section sdcSection={sdcSection}>
                        <div data-testid="childdiv">
                        </div>
                    </Section>
                </Section>
            </Section>
        );

        const childdiv: React.ReactNode = getByTestId("childdiv");
        expect(childdiv).toBeVisible();
    });
})
