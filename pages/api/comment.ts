import type { NextApiRequest, NextApiResponse } from 'next';
import fetchComment from '../../app/lib/fetchComment';
import createComments from '../../app/lib/createComment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      const comments = await fetchComment(req, res);
      return comments;
    case 'POST':
      const newComment = await createComments(req, res);
      return newComment;
    default:
      return res.status(400).json({ message: 'Invalid method.' });
  }
}
