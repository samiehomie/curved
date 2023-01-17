'use client';

import dateRelative from '../../lib/dateRelative';
import type { Comment } from '../../interfaces';

type CommentListProps = {
  comments?: Comment[];
};
export default function CommentList({ comments }: CommentListProps) {
  console.log(comments);
  return (
    <div className="space-y-6 mt-10">
      {comments &&
        comments.map((comment) => {
          return (
            <div key={comment.created_at} className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.user.picture}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              <div className="flex-grow">
                <div className="flex space-x-2">
                  <b>{comment.user.name}</b>
                  <time className="text-base-brown">2 days ago</time>
                </div>
                <div>{comment.text}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
