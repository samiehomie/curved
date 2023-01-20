export default function SpinnerBarType({ style }: { style?: string }) {
  return (
    <div
      className={`${style} inline-block h-[1.3rem] mt-[-0.3rem] 
    leading-[1.5rem] align-text-bottom overflow-hidden`}
    >
      <div className="inline-block after:content-['/\A–\A\\\A|'] animate-spin-step whitespace-pre"></div>
    </div>
  );
}
