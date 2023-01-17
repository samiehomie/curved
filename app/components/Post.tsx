import Image from 'next/image';
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

function isBlockObjectResponse(
  obj: BlockObjectResponse | PartialBlockObjectResponse,
): obj is BlockObjectResponse {
  return 'type' in obj;
}

export async function Post({
  promise,
}: {
  promise: Promise<BlockObjectResponse[]>;
}) {
  const blocks = await promise;
  return (
    <div>
      <div className="mx-auto">
        {blocks.map((block) => {
          if (isBlockObjectResponse(block)) {
            switch (block.type) {
              case 'paragraph':
                const strings = block.paragraph.rich_text.map(
                  (p) => p.plain_text,
                );
                return (
                  <p
                    key={block.id}
                    className="my-4 prose prose-sm sm:prose-base text-base-black"
                  >
                    {strings.join('')}
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
      </div>
    </div>
  );
}
