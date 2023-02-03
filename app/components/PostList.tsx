import Link from 'next/link';
import formatDistanceToNowStrict from '../lib/dateRelative';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Footer from './Footer';
import Title from './Title';

function isPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse,
): page is PageObjectResponse {
  return 'properties' in page;
}

export default async function PostList({
  promise,
  category,
  pageNumber,
}: {
  promise: Promise<QueryDatabaseResponse>;
  category: string;
  pageNumber: string | undefined;
}) {
  const { results, next_cursor: nextCursor, has_more: hasMore } = await promise;
  return (
    <>
      <ul>
        {results.map((page) => {
          if (isPageObjectResponse(page)) {
            return (
              <Link
                href={`post/${page.id}`}
                key={page.id}
                className="mt-6 flex flex-col space-y-1.5"
              >
                {'title' in page.properties.document && (
                  <Title
                    title={page.properties.document?.title[0].plain_text}
                    style="ml-[-2.3px] font-bold text-xl flex-wrap"
                  />
                )}
                <div className="break-all">
                  {'rich_text' in page.properties.summary &&
                    page.properties.summary?.rich_text[0].plain_text}
                </div>
                <div className="ml-[2px] text-base-yellow">
                  {formatDistanceToNowStrict(page.created_time)}
                </div>
              </Link>
            );
          }
        })}
      </ul>
      <Footer
        pageName={category}
        hasMore={hasMore}
        nextCursor={nextCursor}
        pageNumber={pageNumber || '1'}
      />
    </>
  );
}
