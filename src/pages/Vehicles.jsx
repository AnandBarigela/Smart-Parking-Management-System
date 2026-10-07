import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Vehicles() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ vehicleNumber:"", vehicleType:"CAR" });
  const [error, setError] = useState("");

  const load = async () => {
    const response = await api.get(`/vehicles/user/${user.id}`);
    setVehicles(response.data);
  };

  useEffect(() => { load(); }, []);

  const addVehicle = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(`/vehicles/user/${user.id}`, form);
      setForm({ vehicleNumber:"", vehicleType:"CAR" });
      load();
    } catch (error) {
      setError(error.response?.data?.message || "Could not add vehicle");
    }
  };

  const removeVehicle = async (id) => {
    await api.delete(`/vehicles/${id}`);
    load();
  };

  return (
    <main className="page">
      <h1>My Vehicles</h1>

      <form className="inline-form" onSubmit={addVehicle}>
        <input
          placeholder="Vehicle number e.g. TS09AB1234"
          value={form.vehicleNumber}
          onChange={(e) => setForm({...form, vehicleNumber:e.target.value})}
          required
        />

        <select
          value={form.vehicleType}
          onChange={(e) => setForm({...form, vehicleType:e.target.value})}
        >
          <option value="CAR">CAR</option>
          <option value="BIKE">BIKE</option>
        </select>

        <button className="primary-btn">Add Vehicle</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="list">
        {vehicles.map((v) => (
          <div className="list-item" key={v.id}>
            <span>🚗 <b>{v.vehicleNumber}</b> — {v.vehicleType}</span>
            <button className="danger" onClick={() => removeVehicle(v.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
