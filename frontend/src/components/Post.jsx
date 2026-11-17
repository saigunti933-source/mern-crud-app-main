import { Link } from "react-router-dom";

export default function Post({ post, onDelete }) {
  return (
    <article className="post-card">

      <div className="post-copy">
        <h2 className="post-title">
          {post.title || "Untitled post"}
        </h2>

        <p className="post-content">
          {post.content || "No content provided."}
        </p>
      </div>

      <div className="post-actions">

        <Link
          className="button button-secondary"
          to={`/update-post/${post._id}`}
        >
          Edit
        </Link>

        <button
          className="button button-danger"
          type="button"
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>

      </div>

    </article>
  );
}