import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.AUTH_SECRET,
});

export async function getTitle() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID as string,
  });
  return response.results;
}

export async function getPost({ page_id }: { page_id: string }) {
  const response = await notion.pages.properties.retrieve({
    page_id,
    property_id: 'AwLd',
  });
  return response;
}

export async function getTest({ page_id }: { page_id: string }) {
  const response = await notion.blocks.children.list({
    block_id: page_id,
    page_size: 50,
  });
  return response.results;
}
