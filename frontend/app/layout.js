// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Blog Post Manager",
  description: "Manage your blog posts professionally",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="container">
          <header>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy;  Blog Post Manangment</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
