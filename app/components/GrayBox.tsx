import React from 'react';

export default function GrayBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-base-white border-[6px] bg-base-silver shadow-base border-double">
      <div className="px-3 py-4 text-base-black text-justify flex flex-col space-y-3">
        {children}
      </div>
    </div>
  );
}
