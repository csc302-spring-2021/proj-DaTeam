import React from "react";
import { render } from "@testing-library/react";
import { Responses } from "../Responses";
import { MemoryRouter } from "react-router";

test("render check for responses page", () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={["/responses"]}>
      <Responses />
    </MemoryRouter>
  );
  getByTestId("responses");
});
