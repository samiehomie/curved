import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.AUTH_SECRET,
});

export async function fetchDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID as string,
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
