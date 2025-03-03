"use client"; // 👈 Add this at the top

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ Correct import for useRouter in App Router

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/token/', form)
      localStorage.setItem('token', data.access)
      router.push('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <br />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
