import PostList from '../../components/PostList';

export default function Page({ params }: { params: { pageName: string } }) {
  return (
    /* @ts-expect-error Server Component */
    <PostList category={params.pageName} />
  );
}

export function generateStaticParams() {
  return [{ pageName: 'life' }, { pageName: 'dog' }, { pageName: 'bird' }];
}
