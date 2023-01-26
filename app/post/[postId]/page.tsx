import { fetchPage } from '../../lib/getNotion';
import { Suspense } from 'react';
import { Post } from '../../components/Post';
import Comment from '../../components/comment';
import Spinner from '../../components/Spinner';

export default async function Page({ params }: { params: { postId: string } }) {
  const titleData = fetchPage(params.postId, true);
  const postData = fetchPage(params.postId, false);

  return (
    <div className="max-w-[520px] mx-auto">
      <Suspense
        fallback={<Spinner styles="w-[65px] h-[65px] mx-auto mt-[50px]" />}
      >
        {/* @ts-expect-error Server Component */}
        <Post promiseBody={postData} promiseTitle={titleData} />
      </Suspense>
      <Comment />
    </div>
  );
}
