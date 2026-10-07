import { useEffect, useState } from "react";
import api from "../services/api";
import ParkingSlotCard from "../components/ParkingSlotCard";
import { useAuth } from "../context/AuthContext";

export default function Parking() {
  const { user } = useAuth();
  const [slots, setSlots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const [slotResponse, vehicleResponse] = await Promise.all([
      api.get("/parking-slots"),
      api.get(`/vehicles/user/${user.id}`)
    ]);
    setSlots(slotResponse.data);
    setVehicles(vehicleResponse.data);
  };

  useEffect(() => { load(); }, []);

  const book = async () => {
    if (!vehicleId) {
      setError("Please select a vehicle.");
      return;
    }

    try {
      await api.post("/bookings", {
        userId: user.id,
        vehicleId: Number(vehicleId),
        slotId: selectedSlot.id
      });

      setSelectedSlot(null);
      setVehicleId("");
      setError("");
      await load();
      alert("Parking slot booked successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <main className="page">
      <h1>Parking Slots</h1>
      <p className="muted">Green = available • Red = booked/occupied</p>

      <div className="slot-grid">
        {slots.map(slot => (
          <ParkingSlotCard
            key={slot.id}
            slot={slot}
            onBook={setSelectedSlot}
          />
        ))}
      </div>

      {selectedSlot && (
        <div className="modal">
          <div className="modal-card">
            <h2>Book {selectedSlot.slotNumber}</h2>

            {error && <p className="error">{error}</p>}

            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
            >
              <option value="">Select vehicle</option>
              {vehicles
                .filter(v => v.vehicleType === selectedSlot.vehicleType)
                .map(v => (
                  <option key={v.id} value={v.id}>
                    {v.vehicleNumber}
                  </option>
                ))}
            </select>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={book}>Confirm</button>
              <button onClick={() => setSelectedSlot(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
