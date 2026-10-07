import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Parking from "./pages/Parking";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";

function PrivateRoute({ children, admin = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/vehicles"
          element={<PrivateRoute><Vehicles /></PrivateRoute>} />

        <Route path="/parking"
          element={<PrivateRoute><Parking /></PrivateRoute>} />

        <Route path="/bookings"
          element={<PrivateRoute><Bookings /></PrivateRoute>} />

        <Route path="/admin"
          element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
