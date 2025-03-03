"use client"; // ✅ Add this if using useState or other client-side hooks

import { useState } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
