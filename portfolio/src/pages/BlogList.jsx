import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming backend runs on 3001 as seen in server/index.js
    fetch('http://localhost:3001/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (data.ok) setBlogs(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="blog-container"><p>Loading blogs...</p></div>;
  }

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>My Journal</h1>
        <p>Thoughts on competitive programming, development, and more.</p>
      </header>
      
      <div className="blog-grid">
        {blogs.map(blog => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card">
            <div className="blog-card-content">
              <span className="blog-date">{blog.date}</span>
              <h2>{blog.title}</h2>
              <p className="blog-summary">{blog.summary}</p>
              <span className="read-more">Read Article →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
