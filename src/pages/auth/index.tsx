import { Routes, Route } from "react-router";
import { Login } from "./login";
import { Signup } from "./signup";
import { SidebarDemo } from "@/components/app_dashboard";

export default function Auth() {
  return (
    <Routes>
      {/* Auth oldalak */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<SidebarDemo />} />
      <Route path="/profile" element={<SidebarDemo />} />
      <Route path="/settings" element={<SidebarDemo />} />
      <Route path="/workout" element={<SidebarDemo />} />
    </Routes>
  );
}
