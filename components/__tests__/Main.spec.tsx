 
import { render, screen } from '@testing-library/react';
import { Main } from '@/components/Main';

describe('Main Component', () => {
  const props = {
    title: 'Hello',
    subtitle: 'Surya',
    innerSubTitle: 'Dev',
    description: 'Coding',
    githubUrl: 'http://gh.com',
    linkedInUrl: 'http://li.com',
  };

  it('renders content correctly', () => {
    render(<Main {...props} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Surya')).toBeInTheDocument();
    expect(screen.getByText('Dev')).toBeInTheDocument();
  });
});