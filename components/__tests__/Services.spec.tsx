/* eslint-disable @next/next/no-img-element */
 
import { render, screen } from '@testing-library/react';
import { Services } from '@/components/Services';
import { DEFAULT_SERVICES } from '@/utils/defaults';

jest.mock('@/utils/sanity-client', () => ({
  urlFor: () => ({ url: () => 'http://test.com/icon.png' }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe('Services Component', () => {
  const mockServices = [
    {
      title: 'Web Dev',
      subtitle: 'Building sites',
      details: 'React, Next.js',
      icon: { asset: 'ref' },
      color: 'from-red-500 to-red-600'
    }
  ];

  it('renders provided services', () => {
    render(<Services servicesData={mockServices} />);
    expect(screen.getByText('Web Dev')).toBeInTheDocument();
    expect(screen.getByText('Building sites')).toBeInTheDocument();
  });

  it('renders default services when data is empty', () => {
    render(<Services servicesData={[]} />);
    // Check for a title from DEFAULT_SERVICES
    expect(screen.getByText(DEFAULT_SERVICES[0].title)).toBeInTheDocument();
  });
});