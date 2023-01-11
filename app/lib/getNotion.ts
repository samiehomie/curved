import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.AUTH_SECRET,
});

export async function fetchDatabase(pageName: string) {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID as string,
    filter: {
      and: [
        {
          property: 'category',
          select: {
            does_not_equal: '',
            [pageName ? 'equals' : 'is_not_empty']: pageName ? pageName : true,
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
  });
  return response.results;
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
