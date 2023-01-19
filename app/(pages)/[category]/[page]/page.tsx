import PostList from '../../../components/PostList';
import { fetchDatabase } from '../../../lib/getNotion';
import Footer from '../../../components/Footer';

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string; page: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const next = searchParams?.next;
  const { results, nextCursor, hasMore } = await fetchDatabase(
    params.category,
    next as string,
  );
  return (
    <>
      <PostList database={results} />
      <Footer
        pageName={params.category}
        hasMore={hasMore}
        nextCursor={nextCursor}
        pageNumber={params.page}
      />
    </>
  );
}

export function generateStaticParams() {
  return [
    { category: 'all', page: '2' },
    { category: 'life', page: '2' },
    { category: 'dog', page: '2' },
    { category: 'bird', page: '2' },
  ];
}
