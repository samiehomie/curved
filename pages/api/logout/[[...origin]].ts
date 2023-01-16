import auth0 from '../../../app/lib/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { origin } = req.query;
  const path = origin instanceof Array ? [origin[0]] : [''];

  try {
    await auth0.handleLogout(req, res, {
      returnTo: '/' + path!.join('/'),
    });
  } catch (err: any) {
    res.status(err.status || 400).end(err.message);
  }
}
