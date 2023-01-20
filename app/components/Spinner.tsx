export default function Spinner({ styles }: { styles: string }) {
  return (
    <div className={styles}>
      <div className="h-[100%] w-[100%] rounded-full border-dashed border-[5px] border-base-yellow animate-spin-slow"></div>
    </div>
  );
}
