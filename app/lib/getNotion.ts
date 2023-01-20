import { Client } from '@notionhq/client';
import {
  PartialBlockObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.AUTH_SECRET,
});

export async function fetchDatabase(pageName: string, nextCursor?: string) {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID as string,
    page_size: 5,
    filter: {
      and: [
        {
          property: 'category',
          select: {
            does_not_equal: '',
            [pageName !== 'all' ? 'equals' : 'is_not_empty']: pageName
              ? pageName
              : true,
          },
        },
        {
          property: 'completed',
          select: {
            equals: '완성',
          },
        },
      ],
    },
    ...(nextCursor ? { start_cursor: nextCursor } : {}),
  });
  return response;
}

type fetchPage = {
  (postId: string, onlyTitle: true): Promise<string>;
  (postId: string, onlyTitle: false): Promise<
    (PartialBlockObjectResponse | BlockObjectResponse)[]
  >;
};

export const fetchPage: fetchPage = async (
  postId,
  onlyTitle: boolean,
): Promise<any> => {
  if (onlyTitle) {
    const response = await notion.pages.retrieve({ page_id: postId });
    if ('properties' in response) {
      const title =
        response.properties.document.type === 'title'
          ? response.properties.document.title[0].plain_text
          : '';
      return title;
    }
    return '';
  }
  const response = await notion.blocks.children.list({
    block_id: postId,
    page_size: 100,
  });
  return response.results;
};
