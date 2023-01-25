import PostList from '../../components/PostList';
import { Suspense } from 'react';
import { fetchDatabase } from '../../lib/getNotion';
import Spinner from '../../components/Spinner';

export default function Page({ params }: { params: { category: string } }) {
  const pageData = fetchDatabase(params.category);
  return (
    <Suspense
      fallback={<Spinner styles="w-[65px] h-[65px] mx-auto mt-[100px]" />}
    >
      {/* @ts-expect-error Server Component */}
      <PostList category={params.category} promise={pageData} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return [
    { category: 'all' },
    { category: 'life' },
    { category: 'dog' },
    { category: 'bird' },
  ];
}

export const revalidate = 1800;
