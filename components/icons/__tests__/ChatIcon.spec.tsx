import { render } from "@testing-library/react";
import { ChatIcon } from "../ChatIcon";

describe('ChatIcon Component', () => {
  it('renders correctly', () => {
    const { container } = render(<ChatIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });   
});