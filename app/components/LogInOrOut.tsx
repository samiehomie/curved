import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';

export default function LogInOrOut() {
  const { user, error, isLoading } = useUser();
  const pathname = usePathname();
  console.log(pathname);
  if (isLoading)
    return <div className="text-center text-base-blue">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-base-blue">
        {JSON.stringify(error, null, 2)}
      </div>
    );

  if (user) {
    return (
      <div className="text-center">
        <a
          href={`/api/logout/${pathname}`}
          className="block text-center text-base-white mt-[12px] mb-[18px]"
        >
          <span
            className="tracking-[2px] font-bold px-2.5
          py-1 bg-base-green shadow-[6.6px_6.6px_3px_0px_rgba(0,0,0,0.5)]"
          >
            <span className="text-base-yellow">L</span>ogout
          </span>
        </a>
        <div
          className="inline-block px-2 text-base-silver
        leading-6 text-base bg-base-brown"
        >
          "{user.nickname}씨 잘 오셨습니다."
        </div>
      </div>
    );
  }
  return (
    <div className="text-center">
      <a
        href={`/api/login/${pathname}`}
        className="block text-center text-base-white mt-[12px] mb-[18px]"
      >
        <span
          className="tracking-[2px] font-bold px-2.5
          py-1 bg-base-green shadow-[6.6px_6.6px_3px_0px_rgba(0,0,0,0.5)]"
        >
          <span className="text-base-yellow">L</span>ogin
        </span>
      </a>
      <div
        className="inline-block px-2 text-base-silver
        leading-6 text-base bg-base-brown"
      >
        로그인후 게시글 열람 가능
      </div>
    </div>
  );
}
