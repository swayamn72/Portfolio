import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/index.html" className="nav-logo">
          My Portfolio
        </a>
        <div className="nav-links">
          <a href="/index.html" className="nav-link">Home</a>
          <Link to="/" className="nav-link">Blog</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
