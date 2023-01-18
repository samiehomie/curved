import PostList from '../../components/PostList';
import { fetchDatabase } from '../../lib/getNotion';
import Footer from '../../components/Footer';

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const { results, nextCursor, hasMore } = await fetchDatabase(params.category);
  return (
    <>
      <PostList database={results} />
      <Footer
        pageName={params.category}
        hasMore={hasMore}
        nextCursor={nextCursor}
        pageNumber="1"
      />
    </>
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
