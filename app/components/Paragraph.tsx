import React from 'react';

export default function Paragraph({ children }: { children: React.ReactNode }) {
  return <div className="sm:text-base">{children}</div>;
}
