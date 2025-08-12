import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "@/pages/dashboardPage";
import ProfilePage from "@/pages/profilePage";
import SettingsPage from "@/pages/settingsPage";
import WorkoutPage from "@/pages/workoutPage";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    { label: "Profile", to: "/profile", icon: <UserCog className="h-5 w-5" /> },
    {
      label: "Settings",
      to: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    { label: "Workout", to: "/workout", icon: <LogOut className="h-5 w-5" /> },
  ];

  return (
    <div
      className={cn(
        "flex flex-row w-full h-screen bg-gray-100 dark:bg-neutral-800"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-5 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                to: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Content */}
      <div className="flex flex-1 overflow-y-auto p-4">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export const Logo = () => (
  <a
    href="#"
    className="flex items-center space-x-2 text-sm text-black dark:text-white"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Acet Labs
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a
    href="#"
    className="flex items-center space-x-2 text-sm text-black dark:text-white"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded" />
  </a>
);
