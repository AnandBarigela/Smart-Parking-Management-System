import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", form);
      login(response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid login details");
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h2>Welcome Back</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email:e.target.value})}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({...form, password:e.target.value})}
          required
        />

        <button className="primary-btn">Login</button>

        <p>New user? <Link to="/register">Create account</Link></p>
        <small>Admin: admin@parking.com / admin123</small>
      </form>
    </div>
  );
}
