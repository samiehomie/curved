import PostList from '../../../components/PostList';
import { fetchDatabase } from '../../../lib/getNotion';
import { Suspense } from 'react';
import Spinner from '../../../components/Spinner';

export default function Page({
  params,
  searchParams,
}: {
  params: { category: string; page: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const next = searchParams?.next;
  const pageData = fetchDatabase(params.category, next as string);
  return (
    <Suspense
      fallback={<Spinner styles="w-[65px] h-[65px] mx-auto mt-[100px]" />}
    >
      {/* @ts-expect-error Server Component */}
      <PostList
        category={params.category}
        promise={pageData}
        pageNumber={params.page}
      />
    </Suspense>
  );
}

// export function generateStaticParams() {
//   return [
//     { category: 'all', page: '2' },
//     { category: 'life', page: '2' },
//     { category: 'dog', page: '2' },
//     { category: 'bird', page: '2' },
//   ];
// }
