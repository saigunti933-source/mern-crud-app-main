import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";
import Post from "./Post.jsx";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET ALL POSTS
  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/posts`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not load posts."
        );
      }

      setPosts(
        Array.isArray(result.data) ? result.data : []
      );

    } catch (err) {
      setError(
        err.message || "Could not connect to the API."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // DELETE POST
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/v1/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not delete post."
        );
      }

      setPosts((current) =>
        current.filter((post) => post._id !== id)
      );

    } catch (err) {
      setError(
        err.message || "Could not delete post."
      );
    }
  };

  return (
    <section>

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            YOUR WRITING SPACE
          </p>

          <h1>Latest posts</h1>

          <p className="muted">
            Create, edit, and manage your blog posts.
          </p>
        </div>

        <Link
          className="button button-primary"
          to="/create-post"
        >
          ＋ New post
        </Link>

      </div>

      {error && (
        <p className="notice notice-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="notice">
          Loading posts…
        </p>
      ) : posts.length === 0 ? (

        <div className="empty-state">

          <h2>No posts yet</h2>

          <p className="muted">
            Create your first post to get started.
          </p>

          <Link
            className="button button-primary"
            to="/create-post"
          >
            Create a post
          </Link>

        </div>

      ) : (

        <div className="posts-container">

          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

    </section>
  );
}