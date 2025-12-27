// components/__tests__/Navbar.spec.tsx
 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/utils/theme-context';
import { client } from '@/utils/sanity-client';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

// Mock Sanity client
jest.mock('@/utils/sanity-client', () => ({
  client: {
    fetch: jest.fn(),
  },
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    (client.fetch as jest.Mock).mockResolvedValue([]);
  });

  it('renders navbar links', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    // Since links are duplicated (Desktop/Mobile), we use getAllByText
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
  });

  it('fetches and displays site name from sanity', async () => {
    (client.fetch as jest.Mock).mockImplementation((query) => {
      if (query.includes('header')) return Promise.resolve([{ title: 'My Portfolio' }]);
      return Promise.resolve([{}]);
    });

    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('My Portfolio')).toBeInTheDocument();
    });
  });

  it('toggles mobile menu', () => {
    const { container } = render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const toggleButton = screen.getByLabelText('Toggle menu');
    
    // Find the mobile menu container. 
    // In Navbar.tsx, the mobile menu is the div that contains nav links and has 'md:hidden'
    // We can identify it because it's the parent of the second "Home" link, or by querying the class.
    const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
    
    // Initially, it should be closed (max-h-0)
    expect(mobileMenu).toHaveClass('max-h-0');

    // Click to open
    fireEvent.click(toggleButton);
    
    // Should now be open (max-h-screen)
    expect(mobileMenu).toHaveClass('max-h-screen');
    expect(mobileMenu).toHaveClass('opacity-100');
    
    // Click to close
    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass('max-h-0');
  });

  it('changes shadow on scroll', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('shadow-lg');
  });
});