import GrayBox from './components/GrayBox';
import Paragraph from './components/Paragraph';
import GreenButton from './components/GreenButton';
import { Suspense } from 'react';
import Spinner from './components/Spinner';
import { fetchDatabase } from './lib/getNotion';
import PostListForIndex from './components/PostListForIndex';

export default function Index() {
  const pageData = fetchDatabase('all');
  return (
    <div className="flex flex-col space-y-7">
      <GrayBox>
        <Paragraph>
          <h3 className="text-xl sm:text-2xl font-bold">New Blue Curve</h3>
          근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및
          단체행동권을 가진다.
        </Paragraph>
        <Paragraph>
          <h4 className="text-base sm:text-xl font-bold">Audits</h4>
          대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.
          공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 국회에
          제출된 법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지
          아니한다.
        </Paragraph>
        <Paragraph>
          <h4 className="text-base sm:text-xl font-bold">Admin keys</h4>
          다만, 국회의원의 임기가 만료된 때에는 그러하지 아니하다. 국무총리 또는
          행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는
          직권으로 총리령 또는 부령을 발할 수 있다. 여자의 근로는 특별한 보호를
          받으며, 고용·임금 및 근로조건에 있어서 부당한 차별을 받지 아니한다.
          모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를
          가진다.
        </Paragraph>
      </GrayBox>
      <GrayBox>
        <fieldset className="px-2 border border-solid border-base-black">
          <legend className="text-center">Curve posts</legend>
          <Suspense
            fallback={<Spinner styles="w-[65px] h-[65px] mx-auto mt-[10px]" />}
          >
            {/* @ts-expect-error Server Component */}
            <PostListForIndex promise={pageData} />
          </Suspense>
          <div className="text-center">
            <GreenButton path="/all" text="See All Posts" prefetch={true} />
          </div>
        </fieldset>
      </GrayBox>
    </div>
  );
}

export const revalidate = 1800;
