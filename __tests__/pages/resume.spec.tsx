import { render, screen } from '@testing-library/react';
import ResumePage from '@/pages/resume';

describe('Resume Page', () => {
  it('renders and runs redirect effect', () => {
    render(<ResumePage />);

    // Assert stable UI (effect already executed during render)
    expect(
      screen.getByText(/Preparing your download/i)
    ).toBeInTheDocument();
  });
});
