import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Contact } from "@/components/Contact";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";
// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div>ToastContainer</div>,
}));

// Mock sanity urlFor
jest.mock("@/utils/sanity-client", () => ({
  urlFor: () => ({ url: () => "http://test.com/img.jpg" }),
}));

describe("Contact Component", () => {
  const mockContact = {
    name: "Test Name",
    contactUsTitle: "Contact Title",
    contactUsDescription: "Contact Desc",
    email: "test@test.com",
    phone: "1234567890",
    location: "Earth",
    linkedin: "http://linkedin",
    github: "http://github",
    contactUsImage: "img-ref",
  };

  it("renders contact details", () => {
    render(<Contact contactDetails={mockContact} />);
    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });

  it("handles form submission success", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<Contact contactDetails={mockContact} />);

    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your phone number"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("your.email@example.com"), {
      target: { value: "u@u.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("What is this about?"), {
      target: { value: "Sub" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Tell me about your project..."),
      { target: { value: "Msg" } }
    );

    fireEvent.click(screen.getByText("Send Message"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining("successfully")
      );
    });
  });

  it("handles form submission failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    render(<Contact contactDetails={mockContact} />);

    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your phone number"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("your.email@example.com"), {
      target: { value: "u@u.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("What is this about?"), {
      target: { value: "Sub" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Tell me about your project..."),
      { target: { value: "Msg" } }
    );

    fireEvent.click(screen.getByText("Send Message"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Failed")
      );
    });
  });
});
