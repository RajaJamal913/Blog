"use client";  // <-- Add this line

import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/tasks/');
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  return (
    <Layout>
      <h1>Task Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} - {task.completed ? "✅" : "❌"}</li>
        ))}
      </ul>
    </Layout>
  );
}
