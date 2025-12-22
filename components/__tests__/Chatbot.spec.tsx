import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chatbot from "@/components/Chatbot";
import "@testing-library/jest-dom";
// Mock scrollIntoView since JSDOM doesn't implement it
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Chatbot Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("is closed by default and opens on click", () => {
    render(<Chatbot />);
    // Initial state: Launcher button visible, window hidden
    expect(screen.queryByText("Surya's Assistant")).not.toBeInTheDocument();

    // Click launcher (it's the only button initially visible, or the last one rendered)
    const buttons = screen.getAllByRole("button");
    const launcher = buttons[buttons.length - 1];
    fireEvent.click(launcher);

    expect(screen.getByText("Surya's Assistant")).toBeInTheDocument();
  });

  it("sends a message and displays response", async () => {
    // 1. Mock the API success response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        text: "I am a bot",
        sources: ["source-doc-1"],
      }),
    });

    render(<Chatbot />);

    // 2. Open chat
    const buttons = screen.getAllByRole("button");
    const launcher = buttons[buttons.length - 1];
    fireEvent.click(launcher);

    // 3. Type message
    const input = screen.getByPlaceholderText("Ask about Surya's skills...");
    fireEvent.change(input, { target: { value: "Hello Bot" } });

    // 4. Submit form
    // Using closest('form') is safer than finding the button by role when icons are involved
    const form = input.closest("form");
    expect(form).toBeInTheDocument();
    fireEvent.submit(form!);

    // 5. Verify User Message appears (use findBy to allow for React state updates)
    const userMsg = await screen.findByText("Hello Bot");
    expect(userMsg).toBeInTheDocument();

    // 6. Verify Bot Response appears
    const botMsg = await screen.findByText("I am a bot");
    expect(botMsg).toBeInTheDocument();

    // 7. Verify Sources appear
    // The component formats sources as: "source..."
    // We use a regex or function to match strictly
    const sourceElement = await screen.findByText((content) =>
      content.includes("source-doc-1")
    );
    expect(sourceElement).toBeInTheDocument();
  });

  it("handles API errors", async () => {
    // 1. Mock API failure
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<Chatbot />);

    // 2. Open and Submit
    const buttons = screen.getAllByRole("button");
    const launcher = buttons[buttons.length - 1];
    fireEvent.click(launcher);

    const input = screen.getByPlaceholderText("Ask about Surya's skills...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.submit(input.closest("form")!);

    // 3. Verify Error Message
    await waitFor(() => {
      expect(screen.getByText(/trouble connecting/i)).toBeInTheDocument();
    });
  });
});
