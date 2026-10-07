import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", form);
      login(response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <input
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({...form, name:e.target.value})}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email:e.target.value})}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          minLength="6"
          value={form.password}
          onChange={(e) => setForm({...form, password:e.target.value})}
          required
        />

        <button className="primary-btn">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
