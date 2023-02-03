export default function Title({
  title,
  style = 'text-xl mb-5 text-base-blue justify-center font-bold flex-wrap',
}: {
  title: string;
  style?: string;
}) {
  const titleSplited = title.split(' ');
  const baseStyle = 'flex group gap-y-1.5 leading-none';
  const styleMerged = style + ' ' + baseStyle;
  return (
    <h2 className={styleMerged}>
      {titleSplited.map((str, i) => {
        return (
          <span
            className="block whitespace-nowrap mr-[4.2px] last:mr-0"
            key={`title_${i}`}
          >
            {str}
          </span>
        );
      })}
    </h2>
  );
}
