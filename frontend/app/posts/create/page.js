// app/posts/create/page.js
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/posts/",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push("/");
    } catch (err) {
      console.error("Error creating post", err);
      setError("Error creating post. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Create New Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleCreate}>
        <div className="form-field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter post title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Content</label>
          <textarea
            value={content}
            placeholder="Write your post here..."
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Create Post
        </button>
      </form>
    </div>
  );
}
