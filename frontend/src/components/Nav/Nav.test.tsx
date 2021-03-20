import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from "../../App";

const renderWithRouter = (component: React.ReactNode) => {
    const history: any = createMemoryHistory()
    return { 
    ...render (
    <Router history={history}>
        {component}
    </Router>
    )
  }
}

afterEach(cleanup);

describe("Nav", () => {
    it('renders without error', () => {
        const { getByTestId } = render(<App />);
        getByTestId("nav")
    });

    it('navigates to multiple pages', () => {
        const { getByTestId } = render(<App />);
        getByTestId("nav");

        fireEvent.click(getByTestId("menu-btn-responses"));
        const responses: React.ReactNode = getByTestId("responses");
        expect(responses).toBeInTheDocument();
        fireEvent.click(getByTestId("menu-btn-forms"));
        const forms: React.ReactNode = getByTestId("forms");
        expect(forms).toBeInTheDocument();
        fireEvent.click(getByTestId("menu-btn-home"));
        const home: React.ReactNode = getByTestId("home")
        expect(home).toBeInTheDocument();
    });

    it("should render the response page", () => {
        const { container, getByTestId } = renderWithRouter(<App />) 
        const navbar: React.ReactNode = getByTestId('nav')
        const link: HTMLElement | SVGElement | null = getByTestId('responses-link')
        fireEvent.click(getByTestId("menu-btn-responses"));
        expect(link).toBeVisible();
        expect(getByTestId("responses")).toBeInTheDocument();
        expect(container).toBeVisible();
        expect(navbar).toContainElement(link)
    });

    it("should render the home page", () => {
        const { container, getByTestId } = renderWithRouter(<App />) 
        const navbar: React.ReactNode = getByTestId('nav')
        const link:HTMLElement | SVGElement | null = getByTestId('home-link')
        fireEvent.click(getByTestId("menu-btn-home"));
        expect(link).toBeVisible();
        expect(getByTestId("home")).toBeInTheDocument();
        expect(container).toBeVisible();
        expect(navbar).toContainElement(link)
    });

    it("should render the forms page", () => {
        const { container, getByTestId } = renderWithRouter(<App />) 
        const navbar: React.ReactNode = getByTestId('nav')
        const link:HTMLElement | SVGElement | null = getByTestId('forms-link')
        fireEvent.click(getByTestId("menu-btn-forms"));
        expect(getByTestId("forms")).toBeInTheDocument();
        expect(link).toBeVisible();
        expect(container).toBeVisible();
        expect(navbar).toContainElement(link)
    });
})
