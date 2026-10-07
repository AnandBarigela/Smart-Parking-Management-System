import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const response = await api.get(`/bookings/user/${user.id}`);
    setBookings(response.data);
  };

  useEffect(() => { load(); }, []);

  const action = async (id, type) => {
    await api.post(`/bookings/${id}/${type}`);
    load();
  };

  const cancel = async (id) => {
    await api.put(`/bookings/${id}/cancel`);
    load();
  };

  return (
    <main className="page">
      <h1>My Bookings</h1>

      {bookings.length === 0 && (
        <div className="empty">No bookings yet. Book a parking slot first.</div>
      )}

      <div className="list">
        {bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div>
              <p className="tag">BOOKING #{b.id}</p>
              <h2>{b.parkingSlot.slotNumber}</h2>
              <p>Vehicle: <b>{b.vehicle.vehicleNumber}</b></p>
              <p>Status: <b>{b.status}</b></p>
              {b.fee > 0 && <p>Parking Fee: <b>₹{b.fee}</b></p>}
            </div>

            <div className="hero-buttons">
              {b.status === "BOOKED" && (
                <button className="primary-btn" onClick={() => action(b.id, "entry")}>
                  Vehicle Entry
                </button>
              )}

              {b.status === "PARKED" && (
                <button className="primary-btn" onClick={() => action(b.id, "exit")}>
                  Vehicle Exit
                </button>
              )}

              {b.status === "BOOKED" && (
                <button className="danger" onClick={() => cancel(b.id)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
