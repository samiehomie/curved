'use client';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

function toggle(on: boolean) {
  return classNames({
    'cursor-pointer': true,
    'text-base-brown pointer-events-none': on,
  });
}
export default function Footer({
  pageName,
  pageNumber,
  hasMore,
  nextCursor,
}: {
  pageName: string;
  pageNumber: string;
  hasMore: boolean;
  nextCursor: string | null;
}) {
  const pageCond = pageNumber === '1';
  const router = useRouter();
  console.log('nextCursor: ', nextCursor);
  console.log('nextCursor type: ', typeof nextCursor);
  return (
    <ul className="block mx-auto mt-11 w-[30%] flex justify-between text-point-blue text-base">
      <li className={toggle(pageCond)} onClick={() => router.back()}>
        이전
      </li>
      <li className={toggle(true)}>{pageNumber}</li>
      <li
        className={toggle(!hasMore)}
        onClick={() =>
          router.push(
            `/${pageName}/${Number(pageNumber) + 1}?next=${nextCursor}`,
          )
        }
      >
        다음
      </li>
    </ul>
  );
}
