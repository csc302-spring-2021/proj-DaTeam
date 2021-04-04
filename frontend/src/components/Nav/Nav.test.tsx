import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../../App";

const renderWithRouter = (component: React.ReactNode) => {
  const history: any = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

afterEach(cleanup);

describe("Nav", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<App />);
    getByTestId("nav");
  });

  it("navigates to multiple pages", () => {
    const { getByTestId } = render(<App />);
    getByTestId("nav");

    fireEvent.click(getByTestId("responses-link"));
    const responses: React.ReactNode = getByTestId("responses");
    expect(responses).toBeInTheDocument();
    fireEvent.click(getByTestId("forms-link"));
    const forms: React.ReactNode = getByTestId("forms");
    expect(forms).toBeInTheDocument();
    fireEvent.click(getByTestId("home-link"));
    const home: React.ReactNode = getByTestId("home");
    expect(home).toBeInTheDocument();
  });

  it("should render the response page", () => {
    const { container, getByTestId } = renderWithRouter(<App />);
    const navbar: React.ReactNode = getByTestId("nav");
    const link: HTMLElement | SVGElement | null = getByTestId("responses-link");
    expect(link).toBeVisible();
    fireEvent.click(link);
    expect(getByTestId("responses")).toBeInTheDocument();
    expect(container).toBeVisible();
    expect(navbar).toContainElement(link);
  });

  it("should render the home page", () => {
    const { container, getByTestId } = renderWithRouter(<App />);
    const navbar: React.ReactNode = getByTestId("nav");
    const link: HTMLElement | SVGElement | null = getByTestId("home-link");
    expect(link).toBeVisible();
    fireEvent.click(link);
    expect(getByTestId("home")).toBeInTheDocument();
    expect(container).toBeVisible();
    expect(navbar).toContainElement(link);
  });

  it("should render the forms page", () => {
    const { container, getByTestId } = renderWithRouter(<App />);
    const navbar: React.ReactNode = getByTestId("nav");
    const link: HTMLElement | SVGElement | null = getByTestId("forms-link");
    fireEvent.click(link);
    expect(getByTestId("forms")).toBeInTheDocument();
    expect(link).toBeVisible();
    expect(container).toBeVisible();
    expect(navbar).toContainElement(link);
  });
});
