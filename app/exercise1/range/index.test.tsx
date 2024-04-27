import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Range from "./index";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Range", () => {
  window.ResizeObserver = ResizeObserver;
  test("move minBullet to max position", async () => {
    const user = userEvent.setup();
    render(<Range min={1} max={100} />);
    const minLabel = screen.getByTestId("minLabel");
    expect(minLabel).toHaveTextContent("1€");
    const minBullet = screen.getByTestId("minBullet");
    const minBulletXBefore = minBullet.getBoundingClientRect().x;
    const maxBullet = screen.getByTestId("maxBullet");
    // fireEvent.mouseDown(minBullet);
    // fireEvent.mouseMove(minBullet, {
    //   clientX: maxBullet.getBoundingClientRect().x,
    // });
    // fireEvent.mouseUp(minBullet);
    await user.pointer([
      { target: minBullet },
      "MouseLeft>",
      { target: maxBullet },
      "/MouseLeft",
    ]);

    const minBulletXAfter = minBullet.getBoundingClientRect().x;
    // expect(minLabel).toHaveTextContent("99€");
    // const updatedLabel = await screen.findByText("99€");
    // expect(updatedLabel).toBeInTheDocument();
    // await waitFor(
    //   () => {
    //     expect(minLabel).toHaveTextContent("99€");
    //   },
    //   {
    //     timeout: 1000,
    //   }
    // );
    expect(minBulletXAfter).toBeGreaterThan(minBulletXBefore);
  });
});
