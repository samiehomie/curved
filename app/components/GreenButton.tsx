import Link from 'next/link';
import React from 'react';

export default function GreenButton({
  path,
  text,
  prefetch,
}: {
  path: string;
  text: string;
  prefetch: boolean;
}) {
  const firstText = text[0].toUpperCase();
  const restText = text.slice(1);
  const LinkTag = ({
    path,
    children,
  }: {
    path: string;
    children: React.ReactNode;
  }) =>
    prefetch ? (
      <Link
        href={path}
        className="inline-block text-center text-base-white mt-[12px] mb-[18px] group"
      >
        {children}
      </Link>
    ) : (
      <a
        href={path}
        className="inline-block text-center text-base-white mt-[12px] mb-[18px] group"
      >
        {children}
      </a>
    );

  return (
    <div className="text-center">
      <LinkTag path={path}>
        <span
          className="tracking-[2px] font-bold px-2.5 py-1
      bg-base-green sm:group-hover:bg-point-green shadow-[6.6px_6.6px_3px_0px_rgba(0,0,0,0.5)]"
        >
          <span className="text-base-yellow">{firstText}</span>
          {restText}
        </span>
      </LinkTag>
    </div>
  );
}
