import auth0 from '../../../app/lib/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { origin } = req.query;
  const path = origin instanceof Array ? origin : [''];

  try {
    await auth0.handleLogin(req, res, {
      returnTo: '/' + path!.join('/'),
    });
  } catch (err: any) {
    res.status(err.status || 400).end(err.message);
  }
}
