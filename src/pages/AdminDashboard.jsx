import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({
    slotNumber:"",
    vehicleType:"CAR",
    hourlyRate:30,
    status:"AVAILABLE"
  });

  const load = async () => {
    const [statsResponse, slotResponse] = await Promise.all([
      api.get("/admin/dashboard"),
      api.get("/parking-slots")
    ]);
    setStats(statsResponse.data);
    setSlots(slotResponse.data);
  };

  useEffect(() => { load(); }, []);

  const addSlot = async (e) => {
    e.preventDefault();
    await api.post("/parking-slots", {
      ...form,
      hourlyRate: Number(form.hourlyRate)
    });
    setForm({
      slotNumber:"",
      vehicleType:"CAR",
      hourlyRate:30,
      status:"AVAILABLE"
    });
    load();
  };

  const deleteSlot = async (id) => {
    if (!confirm("Delete this slot?")) return;
    await api.delete(`/parking-slots/${id}`);
    load();
  };

  return (
    <main className="page">
      <p className="tag">ADMIN PANEL</p>
      <h1>Parking Management Dashboard</h1>

      <div className="stats">
        <div><b>{stats.users || 0}</b><span>Users</span></div>
        <div><b>{stats.vehicles || 0}</b><span>Vehicles</span></div>
        <div><b>{stats.slots || 0}</b><span>Slots</span></div>
        <div><b>{stats.bookings || 0}</b><span>Bookings</span></div>
      </div>

      <h2>Add Parking Slot</h2>

      <form className="inline-form" onSubmit={addSlot}>
        <input
          placeholder="Slot number"
          value={form.slotNumber}
          onChange={(e) => setForm({...form, slotNumber:e.target.value})}
          required
        />

        <select
          value={form.vehicleType}
          onChange={(e) => setForm({...form, vehicleType:e.target.value})}
        >
          <option value="CAR">CAR</option>
          <option value="BIKE">BIKE</option>
        </select>

        <input
          type="number"
          min="1"
          value={form.hourlyRate}
          onChange={(e) => setForm({...form, hourlyRate:e.target.value})}
        />

        <button className="primary-btn">Add Slot</button>
      </form>

      <h2>All Parking Slots</h2>

      <div className="list">
        {slots.map((slot) => (
          <div className="list-item" key={slot.id}>
            <span>
              <b>{slot.slotNumber}</b> — {slot.vehicleType} — ₹{slot.hourlyRate}/hr
            </span>

            <span className={slot.status === "AVAILABLE" ? "good" : "bad"}>
              {slot.status}
            </span>

            <button className="danger" onClick={() => deleteSlot(slot.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
