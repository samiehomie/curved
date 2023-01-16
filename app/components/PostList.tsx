import Link from 'next/link';
import { fetchDatabase } from '../lib/getNotion';
import formatDistanceToNowStrict from '../lib/dateRelative';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

function isPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse,
): page is PageObjectResponse {
  return 'properties' in page;
}

export default async function PostList({ category }: { category: string }) {
  const database = await fetchDatabase(category);
  return (
    <>
      <ul>
        {database.map((page) => {
          if (isPageObjectResponse(page)) {
            if (page.properties.category.type === 'select') {
              return (
                <Link
                  href={`${category || page.properties.category.select!.name}/${
                    page.id
                  }`}
                  key={page.id}
                  className="mt-6 flex flex-col space-y-1.5"
                >
                  <h2 className="ml-[-2.3px] font-bold text-xl leading-none">
                    {'title' in page.properties.document
                      ? page.properties.document?.title[0].plain_text
                      : ''}
                  </h2>
                  <div>
                    {'rich_text' in page.properties.summary
                      ? page.properties.summary?.rich_text[0].plain_text
                      : ''}
                  </div>
                  <div className="ml-[2px] text-base-yellow">
                    {formatDistanceToNowStrict(page.created_time)}
                  </div>
                </Link>
              );
            }
          }
        })}
      </ul>
    </>
  );
}
