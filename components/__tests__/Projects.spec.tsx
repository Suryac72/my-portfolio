/* eslint-disable @next/next/no-img-element */
 
import { render, screen } from '@testing-library/react';
import { Projects } from '@/components/Project'; // Note: The file exports 'Projects' but file is Project.tsx
import { ProjectItem } from '@/components/ProjectItem';
import { ProjectCard } from '@/components/ProjectCard';
import { mockProjects } from '@/__mocks__/mock';

jest.mock('@/utils/sanity-client', () => ({
  urlFor: () => ({ url: () => 'http://test.com/proj.png' }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe('Project Components', () => {
  describe('ProjectItem', () => {
    it('renders project item details', () => {
      render(
        <ProjectItem 
          title="My App" 
          backgroundImg="/img.jpg" 
          projectUrl="/p/1" 
          projectTech="React" 
        />
      );
      expect(screen.getByText('My App')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('More Info').closest('a')).toHaveAttribute('href', '/p/1');
    });
  });

  describe('Projects (List)', () => {
    it('renders list of projects', () => {
      render(<Projects projects={mockProjects} />);
    });
  });

  describe('ProjectCard (Detail)', () => {
    it('renders full project details', () => {
      render(
        <ProjectCard 
          title="Full App"
          subtitle="A big app"
          description="Description here"
          imageUrl="/img.jpg"
          codeUrl="http://github.com"
          projectUrl="http://demo.com"
          technologies={['React', 'Node']}
        />
      );

      expect(screen.getByText('Full App')).toBeInTheDocument();
      expect(screen.getByText('Description here')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.find(b => b.textContent === 'Code')?.parentElement).toHaveAttribute('href', 'http://github.com');
      expect(buttons.find(b => b.textContent === 'Demo')?.parentElement).toHaveAttribute('href', 'http://demo.com');
    });

    it('disables buttons if urls are missing', () => {
      render(
        <ProjectCard 
          title="Empty App"
          subtitle=""
          description=""
          imageUrl=""
          codeUrl=""
          projectUrl=""
          technologies={[]}
        />
      );
      
      const codeBtn = screen.getByText('Code');
      const demoBtn = screen.getByText('Demo');
      
      expect(codeBtn).toBeDisabled();
      expect(demoBtn).toBeDisabled();
    });
  });
});