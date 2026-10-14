import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto d-flex gap-2">
          {token ? (
            <>
              <Link to="/private">
                <button className="btn btn-success me-2">Private</button>
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary me-2">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-secondary me-2">Signup</button>
              </Link>
              <Link to="/demo">
                <button className="btn btn-outline-primary">Check the Context in action</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};