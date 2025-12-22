import { render, screen } from '@testing-library/react';
import App from '@/pages/_app';
import { Router } from 'next/router';

jest.mock('@/components', () => ({
  Navbar: () => <div>Navbar</div>,
  CustomCursor: () => <div>Cursor</div>,
}));

jest.mock('@/utils/theme-context', () => ({
  ThemeProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('_app', () => {
  it('wraps page with providers and layout', () => {
    const Page = () => <div>Page</div>;

    const mockRouter = {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(null),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    } as unknown as Router;

    render(
      <App
        Component={Page}
        pageProps={{}}
        router={mockRouter}
      />
    );

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Cursor')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
  });
});
