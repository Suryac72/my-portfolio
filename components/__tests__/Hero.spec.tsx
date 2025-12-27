/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
 
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/components/Hero';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock sanity client urlFor
jest.mock('@/utils/sanity-client', () => ({
  urlFor: () => ({ url: () => 'http://test.com/image.jpg' }),
}));

describe('Hero Component', () => {
  const mockHeader = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    innerSubTitle: 'Test Inner',
    description: 'Test Description',
    githubUrl: 'http://github.com',
    linkedInUrl: 'http://linkedin.com',
    image: 'image-ref'
  };

  it('renders correctly with provided data', () => {
    render(<Hero header={mockHeader} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Inner')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders defaults when optional data is missing', () => {
    const emptyHeader = { ...mockHeader, title: '', subtitle: '', image: null };
    render(<Hero header={emptyHeader as any} />);
    
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Surya Prakash')).toBeInTheDocument();
    expect(screen.getByText('SPC')).toBeInTheDocument(); // Fallback for no image
  });

  it('updates mouse position state on mousemove', () => {
    render(<Hero header={mockHeader} />);
    
    // Trigger mouse move
    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    
    // Since we can't easily check the internal state, we check if the style updated 
    // (Note: This depends on implementation details, but ensures effect runs)
    const backgroundCircle = document.querySelector('.blur-3xl');
    expect(backgroundCircle).toHaveStyle({ left: '2px', top: '2px' }); // 100 * 0.02
  });
});