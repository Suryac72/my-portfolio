 

import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButton } from '@/components/ToggleButton';
import { ThemeProvider } from '@/utils/theme-context';

describe('ToggleButton', () => {
  it('toggles theme on click', () => {
    render(
      <ThemeProvider>
        <ToggleButton />
      </ThemeProvider>
    );

    // Initial state check (based on default light theme in ThemeProvider)
    const button = screen.getByAltText('Sun').closest('div')?.parentElement;
    
    // Click to toggle
    fireEvent.click(button!);
    
    // Should now show Moon (Dark mode)
    expect(screen.getByAltText('Moon')).toBeInTheDocument();
  });
});