import { render } from "@testing-library/react";
import { XIcon } from "../XIcon";

describe('XIcon Component', () => {
  it('renders correctly', () => {
    const { container } = render(<XIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });   
});