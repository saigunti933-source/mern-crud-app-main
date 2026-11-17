import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">

        <Link
          className="brand"
          to="/"
          aria-label="MERN CRUD Blog home"
        >
          <span className="brand-mark">M</span>
          <span>MERN Blog</span>
        </Link>

        <nav
          className="main-nav"
          aria-label="Main navigation"
        >
          <NavLink to="/" end>
            All posts
          </NavLink>

          <NavLink
            className="nav-create"
            to="/create-post"
          >
            ＋ Create post
          </NavLink>
        </nav>

      </div>
    </header>
  );
}