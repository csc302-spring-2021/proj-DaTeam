import React from "react";
import { render } from "@testing-library/react";
import { FormRenderer } from ".";

test("render check for loading page", () => {
  render(<FormRenderer />);
});
