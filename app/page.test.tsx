import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "./page";

// tests for this component are in https://github.com/roggc/nextjs-range-component-test

describe("Page", () => {
  it("renders", () => {
    render(<Page />);
  });
});
