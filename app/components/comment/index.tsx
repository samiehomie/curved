'use client';

import CommentForm from './form';
import CommentList from './list';
import useComments from '../../hooks/useComment';

export default function Comment() {
  const { text, setText, comments, onSubmit } = useComments();

  return (
    <div className="mt-16">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
      <CommentList comments={comments} />
    </div>
  );
}
