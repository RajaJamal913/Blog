"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("JWT Token:", token);

    if (!token) {
      console.warn("No token found. Redirecting to login.");
      router.push("/login");
      return;
    }

    // Adjust the URL if your backend requires a trailing slash
    axios
      .get("http://127.0.0.1:8000/api/posts/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Posts response:", response.data);
        // If your API response is wrapped (e.g. { results: [...] }), adjust accordingly:
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (response.data.results) {
          setPosts(response.data.results);
        } else {
          console.error("Unexpected response format", response.data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Error fetching blog posts. Please try again.");
        setLoading(false);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          router.push("/login");
        }
      });
  }, [router]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog Posts</h1>
      <Link  legacyBehavior href="/posts/create">
        <a style={{ marginBottom: "20px", display: "inline-block" }}>Create New Post</a>
      </Link>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          {posts.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {posts.map((post) => (
                <li
                  key={post.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                >
                  <h2>{post.title}</h2>
                  <p>{post.content.substring(0, 150)}...</p>
                  <Link  legacyBehavior href={`/posts/${post.id}`}>
                    <a>Edit</a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blog posts found. Create one to get started!</p>
          )}
        </>
      )}
    </div>
  );
}
