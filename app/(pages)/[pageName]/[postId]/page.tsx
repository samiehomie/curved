import { fetchBlocks, fetchPage } from '../../../lib/getNotion';
import { Suspense } from 'react';
import { Post } from '../../../components/Post';

export default async function Page({ params }: { params: { postId: string } }) {
  const page = fetchPage(params.postId);
  const postData = fetchBlocks(params.postId);

  const title = await page;
  return (
    <>
      <h2 className="font-bold text-xl text-center mb-5 text-base-blue leading-none">
        {title}
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <Post promise={postData} />
      </Suspense>
    </>
  );
}
