import { countTrueOrFalse, fetchDatabase, fetchPage } from '../lib/getNotion';
import { Suspense } from 'react';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import getMonthDays from '../lib/getMonthDays';
import moment from 'moment';
import ChartForPost from './ChartForPost';

async function getLines(
  response: QueryDatabaseResponse,
  cond: 'truth' | 'joke',
) {
  const { results } = response;
  const realLines: string[] = [];
  let dataSet = {};
  for (let i = 0; i < results.length; i++) {
    const blocks = await fetchPage(results[i].id, false);
    const fullData = countTrueOrFalse(blocks);
    const line = fullData[cond];
    dataSet = { ...dataSet, ...fullData.data[cond] };
    realLines.push(...line);
  }
  return { line: realLines.join(' '), data: dataSet };
}

async function TruthLines({
  promiseAll,
  today,
  cond,
}: {
  promiseAll: Promise<QueryDatabaseResponse>[];
  today: string;
  cond: 'truth' | 'joke';
}) {
  const responses = await Promise.all(promiseAll);
  const realBlocks = [];
  for (let i = 0; i < responses.length; i++) {
    const realBlock = getLines(responses[i], cond);
    realBlocks.push(realBlock);
  }
  const results = await Promise.all(realBlocks);
  return (
    <div>
      {results.map((result, i) => (
        <div
          key={`bible-${i}`}
          className="my-10 mx-auto prose prose-sm sm:prose-base text-base-black"
        >
          <h3 className="font-bold leading-none text-base sm:text-xl">
            {cond === 'truth' ? '진실의 서 ' : '거짓의 서 '}
            {moment(today)
              .add(-i, 'months')
              .add(1, 'day')
              .toISOString()
              .slice(0, 7)}
          </h3>
          <ChartForPost data={result.data} cond={cond} />
          <div className="mt-[10px] break-all">{result.line}</div>
        </div>
      ))}
    </div>
  );
}

export default async function TruthOrJoke({
  today,
  cond,
}: {
  today: string;
  cond: 'truth' | 'joke';
}) {
  const monthGen = getMonthDays(today);
  const promiseArray = [...Array(3)].map((_) => {
    const { first, last } = monthGen.next().value!;
    return fetchDatabase('all', '', first, last);
  });
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <TruthLines promiseAll={promiseArray} today={today} cond={cond} />
      </Suspense>
    </div>
  );
}
