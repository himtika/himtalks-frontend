export default function Comment({ comment }) {
  return (
    <div className="bg-gray-100 p-3 rounded">

      <p className="text-sm font-semibold">
        {comment.username}
      </p>

      <p className="text-sm text-gray-600">
        {comment.content}
      </p>

    </div>
  );
}