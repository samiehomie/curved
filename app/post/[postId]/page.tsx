import { fetchPage } from '../../lib/getNotion';
import { Suspense } from 'react';
import { Post } from '../../components/Post';
import Comment from '../../components/comment';
import Spinner from '../../components/Spinner';

export default async function Page({ params }: { params: { postId: string } }) {
  const page = fetchPage(params.postId, true);
  const postData = fetchPage(params.postId, false);
  const title = await page;
  return (
    <div className="max-w-[520px] mx-auto">
      <h2 className="font-bold text-xl text-center mb-5 text-base-blue leading-none">
        {title}
      </h2>
      <Suspense
        fallback={<Spinner styles="w-[65px] h-[65px] mx-auto mt-[50px]" />}
      >
        {/* @ts-expect-error Server Component */}
        <Post promise={postData} />
      </Suspense>
      <Comment />
    </div>
  );
}
