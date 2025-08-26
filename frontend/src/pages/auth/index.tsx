import { Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { Signup } from "./signup";
import { SidebarDemo } from "../../components/AppDashboard";

import PrivateRoute from "../../components/auth/PrivateRoute";

export default function Auth() {
  return (
    <Routes>
      {/* Auth oldalak */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <SidebarDemo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
