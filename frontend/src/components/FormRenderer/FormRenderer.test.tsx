import React from "react";
import { render } from "@testing-library/react";
import { FormRenderer } from ".";
import { QueryClient, QueryClientProvider } from "react-query";

test("render check for loading page", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <FormRenderer />
    </QueryClientProvider>
  );
});
