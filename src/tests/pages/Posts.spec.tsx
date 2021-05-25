import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';


const posts = [
  { slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updated_at: '04-01-2021'}
];

jest.mock('../../services/prismic');

describe('Posts page', () => {

  it('renders correctly', () => {


    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClienteMocked = mocked(getPrismicClient);

    getPrismicClienteMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My New Post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
          }
        ]
      })
    } as any );

    const response = await getStaticProps({});
    console.log(response)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My New Post',
              excerpt: 'Post excerpt',
              updated_at: "Invalid Date"
            }
          ]
        }
      })
    );
  
  });

});

