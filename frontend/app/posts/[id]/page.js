// app/posts/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditPost({ params }) {
  const postId = params.id;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    axios
      .get(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post", err);
        setError("Error fetching post data");
        setLoading(false);
      });
  }, [postId, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/posts/${postId}/`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push("/");
    } catch (err) {
      console.error("Error updating post", err);
      setError("Error updating post. Please try again.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/");
    } catch (err) {
      console.error("Error deleting post", err);
      setError("Error deleting post. Please try again.");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading post data...</p>;

  return (
    <div className="form-container">
      <h1>Edit Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div className="form-field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Update Post
        </button>
      </form>
      <button
        onClick={handleDelete}
        style={{
          marginTop: "10px",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Delete Post
      </button>
    </div>
  );
}
