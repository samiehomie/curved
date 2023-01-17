'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import type { Comment } from '../../interfaces';

type CommentListProps = {
  comments?: Comment[];
};
export default function CommentList({ comments }: CommentListProps) {
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return <div className="text-center text-base-blue">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-base-blue">
        {JSON.stringify(error, null, 2)}
      </div>
    );

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
                <div>{comment.text}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
