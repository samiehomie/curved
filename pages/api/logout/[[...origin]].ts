import auth0 from '../../../app/lib/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await auth0.handleLogout(req, res, {
      returnTo: '/all',
    });
  } catch (err: any) {
    res.status(err.status || 400).end(err.message);
  }
}
