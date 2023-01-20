import { useUser } from '@auth0/nextjs-auth0/client';
import Spinner from './Spinner';
import GreenButton from './GreenButton';

export default function LogInOrOut({ path }: { path: string }) {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <Spinner styles="h-[66px] w-[66px] mt-3 mx-auto" />;
  // return <div className="text-center text-base-blue">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-base-blue">
        {JSON.stringify(error, null, 2)}
      </div>
    );

  if (user) {
    return (
      <div className="text-center">
        <GreenButton
          path={`/api/logout/${path}`}
          text="logout"
          prefetch={false}
        />
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
      <GreenButton path={`/api/login/${path}`} text="login" prefetch={false} />
      <div
        className="inline-block px-2 text-base-silver
        leading-6 text-base bg-base-brown"
      >
        로그인후 게시글 열람 가능
      </div>
    </div>
  );
}
