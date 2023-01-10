import styles from './post.module.css';
import { fetchBlocks } from '../../lib/getNotion';

export default async function Post({ page_id }: { page_id: string }) {
  const blocks = await fetchBlocks({ page_id });
  return (
    <div className={styles.textBox}>
      {blocks.map((block) => {
        if ('paragraph' in block) {
          const strings = block.paragraph.rich_text.map((p) => p.plain_text);
          return <p key={block.id}>{strings.join('')}</p>;
        }
      })}
    </div>
  );
}
