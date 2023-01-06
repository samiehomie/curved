import { getTitle, getTest } from '../lib/getData';
import { Suspense } from 'react';

async function Post({ page_id }: { page_id: string }) {
  const results = await getTest({ page_id });
  return (
    <div>
      {results.map((result) => {
        return (
          // @ts-ignore
          <p key={result.id}>{result?.paragraph?.rich_text[0]?.plain_text}</p>
        );
      })}
    </div>
  );
}

export default async function Page() {
  const database = await getTitle();

  const titles = database.map((data) => {
    if ('properties' in data) {
      return { id: data.id, content: data.properties };
    }
    return {};
  });
  return (
    <>
      <h1>TEST2</h1>
      <ul>
        {titles.map((data) => {
          return (
            <li key={data.id}>
              <h2>
                {
                  // @ts-ignore
                  data?.content?.document.title[0].plain_text
                }
              </h2>
              <Suspense fallback={<div>Loading...</div>}>
                {/* @ts-expect-error Server Component */}
                <Post page_id={data.id as string} />
              </Suspense>
            </li>
          );
        })}
      </ul>
    </>
  );
}
