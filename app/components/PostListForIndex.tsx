import Link from 'next/link';
import formatDistanceToNowStrict from '../lib/dateRelative';
import SpinnerBarType from './SpinnerBarType';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

function isPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse,
): page is PageObjectResponse {
  return 'properties' in page;
}

export default async function PostListForIndex({
  promise,
}: {
  promise: Promise<QueryDatabaseResponse>;
}) {
  const { results } = await promise;
  return (
    <div>
      <div className="flex flex-row font-bold">
        <div className="basis-[58%] sm:basis-[50%]">
          {'Post '}
          <SpinnerBarType style="opacity-100 sm:opacity-0" />
        </div>
        <div className="sm:basis-[30%] text-center">
          <SpinnerBarType style="opacity-0 sm:opacity-100" />
        </div>
        <div className="basis-[21%] sm:basis-[10%] text-center">True</div>
        <div className="basis-[21%] sm:basis-[10%] text-center">False</div>
      </div>
      <ul className="mt-[5px] flex flex-col space-y-2 sm:space-y-4 mb-[30px]">
        {results.map((page) => {
          if (isPageObjectResponse(page)) {
            return (
              <li key={page.id} className="flex flex-row items-center">
                <Link
                  href={`post/${page.id}`}
                  className="basis-[58%] sm:basis-[80%] sm:flex sm:flex-row group sm:hover:bg-point-blue py-1"
                >
                  <h2
                    className="sm:text-ellipsis sm:overflow-hidden sm:basis-[62.5%] sm:whitespace-nowrap
                  text-base leading-none sm:group-hover:text-base-white"
                  >
                    {'title' in page.properties.document
                      ? page.properties.document?.title[0].plain_text
                      : ''}
                  </h2>

                  <div className="mt-1 sm:mt-0 sm:basis-[37.5%] sm:justify-center flex space-x-2">
                    <div
                      className="inline-block px-[2px] bg-base-orange leading-none
                  font-bold border-b border-dotted sm:group-hover:text-base-white"
                    >
                      {'select' in page.properties.category
                        ? page.properties.category.select?.name.toUpperCase()
                        : ''}
                    </div>
                    <div
                      className="inline-block px-[2px] bg-base-gray500 sm:group-hover:bg-point-black
                  leading-none text-base-white tracking-tighter"
                    >
                      {formatDistanceToNowStrict(
                        page.created_time,
                      ).toUpperCase()}
                    </div>
                  </div>
                </Link>
                <div className="basis-[21%] sm:basis-[10%] text-center text-point-blue">
                  <span className="border-b border-dotted">76%</span>
                </div>
                <div className="basis-[21%] sm:basis-[10%] text-center text-point-red">
                  <span className="border-b border-dotted">24%</span>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
