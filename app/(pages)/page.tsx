import PostList from '../components/PostList';

export default function Page() {
  return (
    /* @ts-expect-error Server Component */
    <PostList category="" />
  );
}
