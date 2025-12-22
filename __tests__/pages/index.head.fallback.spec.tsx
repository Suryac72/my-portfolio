import { render } from '@testing-library/react';
import Home from '@/pages/index';
import { DEFAULT_HEADER } from '@/utils/defaults';

jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

jest.mock('@/components', () => ({
  Hero: () => <div>Hero</div>,
  About: () => <div>About</div>,
  Services: () => <div>Services</div>,
  Skills: () => <div>Skills</div>,
  Projects: () => <div>Projects</div>,
  Contact: () => <div>Contact</div>,
  Chatbot: () => <div>Chatbot</div>,
}));


jest.mock('@/utils/sanity-client', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'image-url',
  })),
}));

describe('Home page Head fallbacks', () => {
  it('uses DEFAULT_HEADER values and skips preload image', () => {
    render(
      <Home
        aboutData={[]}
        skillsData={[]}
        projects={[]}
        header={[]}   // 👈 fallback path
        contactDetails={[]}
        servicesData={[]}
      />
    );

    // ✅ ASSERT TITLE NODE, NOT document.title
    const titleEl = document.querySelector('title');
    expect(titleEl?.textContent).toBe(DEFAULT_HEADER.title);

    // ✅ Meta description fallback
    const description = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');

    expect(description).toBe(DEFAULT_HEADER.description);

    // ✅ Preload image branch skipped
    const preload = document.querySelector('link[rel="preload"][as="image"]');
    expect(preload).toBeNull();
  });
});
