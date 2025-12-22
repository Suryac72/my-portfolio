import { render } from "@testing-library/react";
import { SendIcon } from "../SendIcon";

describe('SendIcon Component', () => {
  it('renders correctly', () => {
    const { container } = render(<SendIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });   
});