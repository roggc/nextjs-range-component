import "@testing-library/dom";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Range from "./index";

// this test fails. for unit tests working see other project https://github.com/roggc/nextjs-range-component-test

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

function isElement(obj: any) {
  if (typeof obj !== "object") {
    return false;
  }
  let prototypeStr, prototype;
  do {
    prototype = Object.getPrototypeOf(obj);
    // to work in iframe
    prototypeStr = Object.prototype.toString.call(prototype);
    // '[object Document]' is used to detect document
    if (
      prototypeStr === "[object Element]" ||
      prototypeStr === "[object Document]"
    ) {
      return true;
    }
    obj = prototype;
    // null is the terminal of object
  } while (prototype !== null);
  return false;
}

function getElementClientCenter(element: any) {
  const { left, top, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

const getCoords = (charlie: any) =>
  isElement(charlie) ? getElementClientCenter(charlie) : charlie;

const sleep = (ms: any) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

async function drag(
  element: any,
  { to: inTo, delta, steps = 20, duration = 500 }: any
) {
  const from = getElementClientCenter(element);
  const to = delta
    ? {
        x: from.x + delta.x,
        y: from.y + delta.y,
      }
    : getCoords(inTo);

  const step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps,
  };

  const current = {
    clientX: from.x,
    clientY: from.y,
  };

  fireEvent.mouseEnter(element, current);
  fireEvent.mouseOver(element, current);
  fireEvent.mouseMove(element, current);
  fireEvent.mouseDown(element, current);
  for (let i = 0; i < steps; i++) {
    current.clientX += step.x;
    current.clientY += step.y;
    await sleep(duration / steps);
    fireEvent.mouseMove(element, current);
  }
  fireEvent.mouseUp(element, current);
}

describe("Range", () => {
  window.ResizeObserver = ResizeObserver;
  test("move minBullet to max position", async () => {
    const user = userEvent.setup();
    render(<Range min={1} max={100} />);
    await new Promise((r) => setTimeout(r, 10));

    const minLabel = screen.getByTestId("minLabel");
    expect(minLabel).toHaveTextContent("1€");
    const maxLabel = screen.getByTestId("maxLabel");
    expect(maxLabel).toHaveTextContent("100€");

    const minBullet = screen.getByTestId("minBullet");
    const minBulletXBefore = minBullet.getBoundingClientRect().x;
    const maxBullet = screen.getByTestId("maxBullet");
    const maxBulletX = maxBullet.getBoundingClientRect().x;
    const portal = screen.getByTestId("portal");

    const current = {
      clientX: 0,
      clientY: 0,
    };
    fireEvent.mouseMove(minBullet, current);
    fireEvent.mouseDown(minBullet, current);

    const longitude = 500;
    const numOfSteps = 30;
    const steps = [...Array(numOfSteps).keys()];
    let x;
    for (const step of steps) {
      x = 0 + (step * longitude) / numOfSteps;
      fireEvent.mouseMove(portal, { clientX: x, clientY: 0 });
      await new Promise((r) => setTimeout(r, 20));
    }
    fireEvent.mouseUp(minBullet, {
      clientX: x,
      clientY: 0,
    });

    // await waitFor(
    //   () => {
    //     expect(maxBulletX).toBeGreaterThan(0);
    //   },
    //   {
    //     timeout: 1000,
    //   }
    // );
    // console.log("maxBulletX", maxBulletX);

    // fireEvent.mouseDown(minBullet);
    // fireEvent.mouseMove(minBullet, {
    //   clientX: maxBullet.getBoundingClientRect().x,
    // });
    // fireEvent.mouseUp(minBullet);

    // await user.pointer([
    //   { target: minBullet },
    //   "MouseLeft>",
    //   { target: maxBullet },
    //   "/MouseLeft",
    // ]);

    // await drag(minBullet, { to: maxBullet, steps: 1, duration: 1000 });

    // const minBulletXAfter = minBullet.getBoundingClientRect().x;

    expect(minLabel).toHaveTextContent("99€");
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

    // expect(minBulletXAfter).toBeGreaterThan(minBulletXBefore);
  });
});
