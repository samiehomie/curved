export default async function getUser(token: string) {
  const response = await fetch(
    `https://${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return await response.json();
}
