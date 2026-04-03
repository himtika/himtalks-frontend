import Comment from "./Comment";

export default function CommentModal({ comments, onClose }) {

  return (
    <div className="modal">

      <h2>Komentar</h2>

      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}

      <button onClick={onClose}>Tutup</button>

    </div>
  );
}