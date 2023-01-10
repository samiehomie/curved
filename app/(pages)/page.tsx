import styles from './pages.module.css';
import { fetchDatabase } from '../../lib/getNotion';
import Post from '../components/Post';
import { Suspense } from 'react';

export default async function Page() {
  const database = await fetchDatabase('');

  return (
    <>
      <ul>
        {database.map((page) => {
          if ('properties' in page) {
            return (
              <li key={page.id} className={styles.article}>
                <h2 className={styles.subTitle}>
                  {'title' in page.properties.document
                    ? page.properties.document?.title[0].plain_text
                    : ''}
                </h2>
                <div className={styles.createdTime}>
                  {new Date(page.created_time).toLocaleString('ko-KR')}
                </div>
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
