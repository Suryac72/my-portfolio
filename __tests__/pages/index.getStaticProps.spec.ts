import { getStaticProps } from '@/pages/index';
import { fetchQuery } from '@/utils/sanity-client';

jest.mock('@/utils/sanity-client', () => ({
  fetchQuery: jest.fn(),
}));

describe('Home getStaticProps', () => {
  it('fetches all homepage data', async () => {
    (fetchQuery as jest.Mock).mockResolvedValue([]);

    const result = await getStaticProps({} as any);

    expect(fetchQuery).toHaveBeenCalledTimes(6);
    expect(result).toMatchObject({
      props: {
        aboutData: [],
        skillsData: [],
        projects: [],
        header: [],
        contactDetails: [],
        servicesData: [],
      },
      revalidate: 60,
    });
  });
  
});
