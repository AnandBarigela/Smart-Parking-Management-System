import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link className="brand" to="/">🅿️ Smart Parking</Link>

      <div className="navlinks">
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/vehicles">Vehicles</Link>}
        {user && <Link to="/parking">Parking</Link>}
        {user && <Link to="/bookings">Bookings</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}
