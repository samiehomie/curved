import styles from './index.module.css';
import { fetchBlocks, fetchDatabase } from '../../lib/getNotion';
import { Suspense } from 'react';

async function Post({ page_id }: { page_id: string }) {
  const blocks = await fetchBlocks({ page_id });
  return (
    <div className={styles.textBox}>
      {blocks.map((block) => {
        if ('paragraph' in block) {
          const strings = block.paragraph.rich_text.map((p) => p.plain_text);
          return <p key={block.id}>{strings.join('')}</p>;
        }
      })}
    </div>
  );
}

export default async function Page() {
  const database = await fetchDatabase();

  return (
    <>
      <h1 className={styles.title}>Index</h1>
      <ul>
        {database.map((page) => {
          if ('properties' in page) {
            return (
              <li key={page.id}>
                <h2 className={styles.subTitle}>
                  {'title' in page.properties.document
                    ? page.properties.document?.title[0].plain_text
                    : ''}
                </h2>
                <Suspense fallback={<div>Loading...</div>}>
                  {/* @ts-expect-error Server Component */}
                  <Post page_id={page.id} />
                </Suspense>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
