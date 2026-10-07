import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="page">
      <section className="welcome">
        <div>
          <p className="tag">USER DASHBOARD</p>
          <h1>Welcome, {user?.name} 👋</h1>
          <p>Manage your vehicles and parking from one place.</p>
        </div>
      </section>

      <div className="feature-grid">
        <Link className="feature-card" to="/vehicles">
          <span>🚗</span>
          <h3>My Vehicles</h3>
          <p>Register and manage your vehicles.</p>
        </Link>

        <Link className="feature-card" to="/parking">
          <span>🅿️</span>
          <h3>Find Parking</h3>
          <p>Check available slots and book parking.</p>
        </Link>

        <Link className="feature-card" to="/bookings">
          <span>📋</span>
          <h3>My Bookings</h3>
          <p>Track active and previous parking.</p>
        </Link>
      </div>
    </main>
  );
}
