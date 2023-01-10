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

export async function fetchBlocks({ page_id }: { page_id: string }) {
  const response = await notion.blocks.children.list({
    block_id: page_id,
    page_size: 100,
  });
  return response.results;
}
