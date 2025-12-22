 // <--- Explicit import to ensure matchers are loaded
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { mockAboutData, mockContactForm, mockProjects, mockServices, mockSkills } from '@/__mocks__/mock';

// 1. Mock all sub-components to isolate page logic
jest.mock('@/components', () => ({
  Hero: () => <div>Hero</div>,
  About: () => <div>About</div>,
  Services: () => <div>Services</div>,
  Skills: () => <div>Skills</div>,
  Projects: () => <div>Projects</div>,
  Contact: () => <div>Contact</div>,
}));

jest.mock('@/components/Chatbot', () => {
  const Chatbot = () => <div>Chatbot</div>;
  Chatbot.displayName = 'Chatbot';
  return Chatbot;
});

// 2. Mock Sanity Client Utils (Crucial to prevent "Malformed asset _ref" error)
jest.mock('@/utils/sanity-client', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'http://test-image.jpg',
  })),
  client: {
    fetch: jest.fn(),
  },
}));

describe('Home Page', () => {
  it('renders all sections', () => {
    render(
      <Home 
        aboutData={[mockAboutData]} 
        skillsData={mockSkills} 
        projects={mockProjects} 
        header={[]} 
        contactDetails={mockContactForm} 
        servicesData={mockServices} 
      />
    );
    
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Chatbot')).toBeInTheDocument();
  });
});