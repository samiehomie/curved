export default function Head({ params }: { params: { pageName: string } }) {
  return (
    <>
      <title>{`nextCurve2 | ${params.pageName || 'index'}`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
