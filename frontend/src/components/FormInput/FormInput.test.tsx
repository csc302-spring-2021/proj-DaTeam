import React, { useState } from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { FormInput } from ".";

const setup = (state: string) => {
  const utils = render(
    <FormInput type="number" state={state} setState={() => {}} />
  );
  const input = utils.getByTestId("form-input");
  return {
    input,
    ...utils,
  };
};

test("It should accept only numbers", () => {
  const { input } = setup("13");
  fireEvent.change(input, { target: { value: '13' } })
  expect((input as any).value).toBe("13");
});

test("It should not accept characters", () => {
  const { input } = setup("abc");
  fireEvent.change(input, { target: { value: 'cdefghguasfdsa' } })
  expect((input as any).value).toBe("");
});