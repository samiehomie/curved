import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.AUTH_SECRET,
});

export default async function fetchData() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID as string,
  });
  return response;
}
