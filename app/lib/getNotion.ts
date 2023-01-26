import { Client } from '@notionhq/client';
import {
  PartialBlockObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';

const notion = new Client({
  auth: process.env.AUTH_SECRET,
});

export type results = (PartialBlockObjectResponse | BlockObjectResponse)[];
export function isBlockObjectResponse(
  obj: BlockObjectResponse | PartialBlockObjectResponse,
): obj is BlockObjectResponse {
  return 'type' in obj;
}

const dateCondition = (start?: string, end?: string) => {
  if (start && end) {
    return [
      {
        timestamp: 'created_time',
        created_time: {
          is_not_empty: true,
          on_or_after: start,
        },
      },
      {
        timestamp: 'created_time',
        created_time: {
          is_not_empty: true,
          before: end,
        },
      },
    ];
  }
  return [];
};
export const fetchDatabase = cache(
  async (
    pageName: string,
    nextCursor?: string,
    first?: string,
    last?: string,
  ) => {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_ID as string,
      page_size: first ? 100 : 5,
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
          // @ts-ignore
          ...dateCondition(first, last),
        ],
      },
      ...(nextCursor ? { start_cursor: nextCursor } : {}),
    });
    return response;
  },
);

type fetchPage = {
  (postId: string, onlyTitle: true): Promise<string>;
  (postId: string, onlyTitle: false): Promise<results>;
};

export const fetchPage: fetchPage = cache(
  async (postId, onlyTitle: boolean): Promise<any> => {
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
  },
);

export const countTrueOrFalse = (results: results) => {
  const truth: string[] = [];
  const joke: string[] = [];
  const data = { truth: {}, joke: {} };
  let numForTruth = 0;
  let numForJoke = 0;
  results.forEach((block) => {
    if (isBlockObjectResponse(block) && block.type === 'paragraph') {
      const createdDay = block.created_time.slice(5, 10);
      block.paragraph.rich_text.forEach((p) => {
        if (p.annotations.underline) {
          if (p.annotations.italic) {
            truth.push(p.plain_text);
            numForTruth += 1;
            // @ts-ignore
            data.truth[createdDay] = numForTruth;
          } else {
            joke.push(p.plain_text);
            numForJoke += 1;
            // @ts-ignore
            data.joke[createdDay] = numForJoke;
          }
        }
      });
    }
  });
  return { truth, joke, data };
};
