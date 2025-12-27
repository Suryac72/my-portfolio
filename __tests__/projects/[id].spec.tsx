
import { render, screen } from '@testing-library/react';
import ProjectPage, {
  getStaticPaths,
  getStaticProps,
} from '@/pages/projects/[id]';
import { client } from '@/utils/sanity-client';

jest.mock('@/utils/sanity-client', () => ({
  urlFor: () => ({ url: () => 'img.jpg' }),
  client: { fetch: jest.fn() },
}));

jest.mock('@/components/ProjectCard', () => ({
  ProjectCard: ({ title }: any) => <div>{title}</div>,
}));

describe('Project Detail Page', () => {
  const mockProject = {
    _id: '1',
    title: 'Detail Project',
    image: 'img',
    subTitle: 'Sub',
    description: 'Desc',
    projectUrl: 'code',
    url: 'live',
    technologies: [],
  };

  it('renders project card', () => {
    render(<ProjectPage project={mockProject as any} />);
    expect(screen.getByText('Detail Project')).toBeInTheDocument();
  });

  it('getStaticPaths returns paths', async () => {
    (client.fetch as jest.Mock).mockResolvedValue([
      { _id: '1' },
      { _id: '2' },
    ]);

    const result = await getStaticPaths();

    expect(result).toEqual({
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } },
      ],
      fallback: 'blocking',
    });
  });

  it('getStaticProps returns project', async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockProject);

    const result = await getStaticProps({
      params: { id: '1' },
    } as any);

    expect(result).toEqual({
      props: { project: mockProject },
    });
  });
});
