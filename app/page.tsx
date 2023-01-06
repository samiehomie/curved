import fetchData from '../lib/getData';

export default async function Page() {
  const database = await fetchData();
  const posts = database.results.map((data) => {
    if ('properties' in data) {
      return { id: data.id, content: data.properties };
    }
    return {};
  });
  return (
    <ul>
      {posts.map((post) => (
        // @ts-ignore
        <li>{post?.content?.document.title[0].plain_text}</li>
      ))}
    </ul>
  );
}
