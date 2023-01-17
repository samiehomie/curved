import auth0 from '../../app/lib/auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default auth0.withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await auth0.getSession(req, res);
  console.log(session);
  if (session) {
    const accessToken = session.accessToken;
    res.status(200).json({ accessToken });
  }
  return res.status(400).json({ message: 'No Session' });
});
