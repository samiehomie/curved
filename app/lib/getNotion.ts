import { Client } from '@notionhq/client';

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
  return {
    results: response.results,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}

export async function fetchPage(postId: string) {
  const response = await notion.pages.retrieve({ page_id: postId });
  if ('properties' in response) {
    const title =
      response.properties.document.type === 'title'
        ? response.properties.document.title[0].plain_text
        : '';
    return title;
  }
  return 'No title';
}

export async function fetchBlocks(postId: string) {
  const response = await notion.blocks.children.list({
    block_id: postId,
    page_size: 100,
  });
  return response.results;
}
