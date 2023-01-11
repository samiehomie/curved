'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function LogInOrOut() {
  const { user, error, isLoading } = useUser();

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
      <a href="/api/auth/logout" className="block text-center text-base-white">
        <span
          className="tracking-[2px] font-bold px-2.5
        py-1 bg-base-green shadow-[6.6px_6.6px_3px_0px_rgba(0,0,0,0.5)]"
        >
          <span className="text-base-yellow">L</span>ogout
        </span>
      </a>
    );
  }
  return (
    <a href="/api/auth/login" className="block text-center text-base-white">
      <span
        className="tracking-[2px] font-bold px-2.5
        py-1 bg-base-green shadow-[6.6px_6.6px_3px_0px_rgba(0,0,0,0.5)]"
      >
        <span className="text-base-yellow">L</span>ogin
      </span>
    </a>
  );
}
