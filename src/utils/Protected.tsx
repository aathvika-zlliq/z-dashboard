import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Get token directly from localStorage
    const token = localStorage.getItem("token");
    const loginPath = "/signin";

    // 1️⃣ If user is logged in and visiting /signin → redirect to /dashboard
    if (token && location.pathname === loginPath) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // 2️⃣ If user is NOT logged in and visiting protected route → redirect to /signin
    if (!token && location.pathname !== loginPath) {
      navigate("/signin", { replace: true });
      return;
    }

    setLoading(false);
  }, [navigate, location.pathname]);

  if (loading) return null; // optional: show spinner

  return <Outlet />;
};

export default PrivateRoute;
