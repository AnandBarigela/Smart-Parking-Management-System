import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="hero">
      <div className="hero-content">
        <div className="tag">SMART PARKING • EASY BOOKING • BETTER MANAGEMENT</div>
        <h1>Find. Book. Park.</h1>
        <p>
          Check parking availability, reserve a slot, manage your vehicle,
          track entry and exit, and calculate parking fees from one simple system.
        </p>
        <div className="hero-buttons">
          <Link className="primary-btn" to="/register">Get Started</Link>
          <Link className="secondary-btn" to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
}
