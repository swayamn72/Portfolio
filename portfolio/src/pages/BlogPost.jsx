import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setBlog(data.data);
        } else {
          setError(data.error || 'Blog not found');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="blog-post-container"><p>Loading...</p></div>;
  }

  if (error || !blog) {
    return (
      <div className="blog-post-container error-state">
        <h2>{error || 'Blog not found'}</h2>
        <Link to="/blog" className="back-link">← Back to blogs</Link>
      </div>
    );
  }

  return (
    <article className="blog-post-container">
      <Link to="/blog" className="back-link">← Back to all articles</Link>
      
      <header className="post-header">
        <span className="post-date">{blog.date}</span>
        <h1>{blog.title}</h1>
      </header>

      <div className="post-content">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default BlogPost;
