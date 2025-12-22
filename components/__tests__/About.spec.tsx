/* eslint-disable @next/next/no-img-element */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { About } from "@/components/About";
import { DEFAULT_ABOUT } from "@/utils/defaults";
import { mockAboutData, mockPersonalData } from "@/__mocks__/mock";

// Mock sanity client urlFor
jest.mock("@/utils/sanity-client", () => ({
  urlFor: () => ({ url: () => "http://test.com/about.jpg" }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe("About Component", () => {
  it("renders with provided data", () => {
    render(<About aboutData={mockAboutData} personal={mockPersonalData} />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Driven by Innovation")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer & UI/UX Enthusiast")).toBeInTheDocument();

    // Check stats
    expect(screen.getByText("25+")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("renders default values when data is missing", () => {
    render(<About aboutData={[] as any} personal={undefined} />);

    expect(screen.getByText(DEFAULT_ABOUT.title)).toBeInTheDocument();
    // Check fallback for personal info
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThan(0);
  });
});
