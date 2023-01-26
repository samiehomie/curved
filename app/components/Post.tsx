import Image from 'next/image';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import classNames from 'classnames';
import { isBlockObjectResponse } from '../lib/getNotion';
import { Suspense } from 'react';

function trueOrFalseBorder(cond: boolean) {
  return classNames({
    'border-b-2 border-point-sky border-dotted relative': cond,
    'border-b-2 border-base-yellow border-dotted relative': !cond,
  });
}

function trueOrFalseText(cond: boolean) {
  return classNames({
    'absolute whitespace-nowrap text-point-sky text-[10px] -top-2 left-0 leading-none':
      cond,
    'absolute whitespace-nowrap text-base-yellow text-[10px] -top-2 left-0 leading-none':
      !cond,
  });
}

function TrueOrFalse({ cond, text }: { cond: boolean; text: string }) {
  return (
    <span className={trueOrFalseBorder(cond)}>
      {text}
      <span className={trueOrFalseText(cond)}>{cond ? '진담' : '농담'}</span>
    </span>
  );
}

async function Blocks({
  promise,
}: {
  promise: Promise<BlockObjectResponse[]>;
}) {
  const blocks = await promise;
  return (
    <>
      {blocks.map((block) => {
        if (isBlockObjectResponse(block)) {
          switch (block.type) {
            case 'paragraph':
              const strings = block.paragraph.rich_text.map((p) => {
                return p.annotations.underline ? (
                  <TrueOrFalse
                    cond={p.annotations.italic}
                    text={p.plain_text}
                  />
                ) : (
                  p.plain_text
                );
              });
              return (
                <p
                  key={block.id}
                  className="my-4 prose prose-sm sm:prose-base text-base-black"
                >
                  {strings}
                </p>
              );

            case 'image':
              if (block.image.type === 'external') {
                const { external, caption } = block.image;
                return (
                  <div key={block.id} className="pb-7">
                    <div className="relative w-[320px] h-[320px] mx-auto sm:w-[500px] sm:h-[500px]">
                      <Image
                        src={external.url}
                        fill={true}
                        alt={caption[0]?.plain_text}
                        priority
                      />
                      <div className="absolute top-[100%] py-[3px] w-[100%] text-center bg-base-gray">
                        {caption[0]?.plain_text}
                      </div>
                    </div>
                  </div>
                );
              }
              return;
          }
        }
      })}
    </>
  );
}

export async function Post({
  promiseBody,
  promiseTitle,
}: {
  promiseBody: Promise<BlockObjectResponse[]>;
  promiseTitle: Promise<string>;
}) {
  const title = await promiseTitle;
  return (
    <div>
      <h2 className="font-bold text-xl text-center mb-5 text-base-blue leading-none">
        {title}
      </h2>
      <div className="mx-auto">
        <Suspense fallback={<div>loading...</div>}>
          {/* @ts-expect-error Server Component */}
          <Blocks promise={promiseBody} />
        </Suspense>
      </div>
    </div>
  );
}
