import { render, fireEvent } from "@testing-library/react";
import { CustomCursor } from "@/components/CustomCursor";
import "@testing-library/jest-dom";

describe("CustomCursor", () => {
  it("updates position on mouse move", () => {
    // Mock desktop width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { container } = render(<CustomCursor />);

    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });

    const dot = container.querySelector(".custom-cursor-dot");
    expect(dot).toHaveStyle({ left: "100px", top: "100px" });
  });

  it("does not render on mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    const { container } = render(<CustomCursor />);
    // When width < 768, it returns null
    expect(container.firstChild).toBeNull();
  });
});
