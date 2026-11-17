import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

export default function AddEditForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // GET POST BY ID
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function fetchPost() {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/api/v1/posts/${id}`,
          {
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Could not load this post."
          );
        }

        setTitle(result.data?.title || "");
        setContent(result.data?.content || "");

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message || "Could not load this post."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPost();

    return () => controller.abort();

  }, [id]);

  // CREATE OR UPDATE POST
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/posts${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not save the post."
        );
      }

      navigate("/");

    } catch (err) {
      setError(
        err.message || "Could not save the post."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="notice">
        Loading post…
      </p>
    );
  }

  return (
    <section className="form-section">

      <p className="eyebrow">
        BLOG MANAGEMENT
      </p>

      <h1>
        {id ? "Edit post" : "Create a post"}
      </h1>

      <p className="muted">
        Add a title and write your post content below.
      </p>

      {error && (
        <p
          className="notice notice-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <form
        className="post-form"
        onSubmit={handleSubmit}
      >

        <label htmlFor="post-title">
          Title
        </label>

        <input
          id="post-title"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
          maxLength={160}
        />

        <label htmlFor="post-content">
          Content
        </label>

        <textarea
          id="post-content"
          placeholder="Write something…"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          required
          rows={9}
        />

        <div className="form-actions">

          <Link
            className="button button-secondary"
            to="/"
          >
            Cancel
          </Link>

          <button
            className="button button-primary"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving…"
              : id
                ? "Update post"
                : "Publish post"}
          </button>

        </div>

      </form>

    </section>
  );
}