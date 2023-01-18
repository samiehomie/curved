'use client';

type CommentFormProps = {
  text: string;
  setText: Function;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function CommentForm({
  text,
  setText,
  onSubmit,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-point-blue text-point-sky placeholder-point-gray"
        rows={2}
        placeholder="댓글을 (생각하고) 입력하세요."
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={false}
      ></textarea>
      <div className="flex items-center mt-4">
        <div className="flex items-center space-x-6">
          <button
            type="submit"
            className="py-2 px-4 rounded bg-base-green text-base-white disabled:opacity-40"
          >
            <span className="text-base-yellow font-bold">S</span>end
          </button>
        </div>
      </div>
    </form>
  );
}
