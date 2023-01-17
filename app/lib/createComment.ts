import type { NextApiRequest, NextApiResponse } from 'next';
import type { Comment } from '../interfaces';
import redis from './redis';
import { nanoid } from 'nanoid';
import clearUrl from './clearUrl';
import getUser from './getUser';

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url = clearUrl(req.headers.referer!);
  const { text } = req.body;
  const { authorization } = req.headers;

  console.log('createComment/auth: ', authorization);

  if (!text || !authorization) {
    return res.status(400).json({ message: 'Missing parameter.' });
  }

  if (!redis) {
    console.log('no redis');
    return res
      .status(500)
      .json({ message: 'Failed to connect to redis client.' });
  }

  try {
    const user = await getUser(authorization);
    if (!user) {
      console.log('no user');
      return res.status(400).json({ message: 'Need authorization.' });
    }

    const { name, picture, sub, email } = user;

    const comment: Comment = {
      id: nanoid(),
      created_at: Date.now(),
      url,
      text,
      user: { name, picture, sub, email },
    };

    // write data
    await redis.lpush(url, JSON.stringify(comment));

    return res.status(200).json(comment);
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' });
  }
}
