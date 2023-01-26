import Link from 'next/link';
import formatDistanceToNowStrict from '../lib/dateRelative';
import SpinnerBarType from './SpinnerBarType';
import { results, fetchPage } from '../lib/getNotion';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { countTrueOrFalse } from '../lib/getNotion';

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
  const resultsWithCount = [];
  for (let i = 0; i < results.length; i++) {
    const blocks = await fetchPage(results[i].id, false);
    const { truth, joke } = countTrueOrFalse(blocks);
    resultsWithCount.push({
      blocks: results[i],
      truth,
      joke,
    });
  }

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
        <div className="basis-[21%] sm:basis-[10%] text-center">진담</div>
        <div className="basis-[21%] sm:basis-[10%] text-center">농담</div>
      </div>
      <ul className="mt-[5px] flex flex-col space-y-2 sm:space-y-4 mb-[30px]">
        {resultsWithCount.map((page) => {
          if (isPageObjectResponse(page.blocks)) {
            return (
              <li key={page.blocks.id} className="flex flex-row items-center">
                <Link
                  href={`post/${page.blocks.id}`}
                  className="basis-[58%] sm:basis-[80%] sm:flex sm:flex-row group sm:hover:bg-point-blue py-1"
                >
                  <h2
                    className="break-all sm:text-ellipsis sm:overflow-hidden sm:basis-[62.5%] sm:whitespace-nowrap
                  text-base leading-none sm:group-hover:text-base-white"
                  >
                    {'title' in page.blocks.properties.document
                      ? page.blocks.properties.document?.title[0].plain_text
                      : ''}
                  </h2>

                  <div className="mt-1 sm:mt-0 sm:basis-[37.5%] sm:justify-center flex space-x-2">
                    <div
                      className="w-[2.5rem] text-center bg-base-orange leading-none
                  font-bold border-b border-dotted sm:group-hover:text-base-white"
                    >
                      {'select' in page.blocks.properties.category
                        ? page.blocks.properties.category.select?.name.toUpperCase()
                        : ''}
                    </div>
                    <div
                      className="inline-block flex-1 max-w-[95px] text-center bg-base-gray500 sm:group-hover:bg-point-black
                  leading-none text-base-white tracking-tighter"
                    >
                      {formatDistanceToNowStrict(
                        page.blocks.created_time,
                      ).toUpperCase()}
                    </div>
                  </div>
                </Link>
                <div className="basis-[21%] sm:basis-[10%] text-center text-point-sky">
                  <span className="border-b border-dotted">
                    {page.truth.length}줄
                  </span>
                </div>
                <div className="basis-[21%] sm:basis-[10%] text-center text-base-yellow">
                  <span className="border-b border-dotted">
                    {page.joke.length}줄
                  </span>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
