import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { LayoutDashboard, Settings, BicepsFlexed, Rss } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import DashboardPage from "@/pages/dashboardPage";
import CommunityPage from "@/pages/communityPage";
import SettingsPage from "@/pages/settingsPage";
import WorkoutPage from "@/pages/workoutPage";
import { UserAuth } from "./auth/AuthContext";
import profilePicture from "./ui/profile.png";
import { EditProfileDialog } from "./editProfileDialog";

export function SidebarDemo() {
  const location = useLocation();
  const [name, setName] = useState("");
  const { session, signOutUser } = UserAuth();
  const allowedRoutes = ["/dashboard", "/community", "/settings", "/workout"];

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setName(data?.name ?? "");
      }
    };

    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  if (!allowedRoutes.includes(location.pathname)) {
    return null;
  }
  const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Community",
      to: "/community",
      icon: (
        <Rss className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Workout",
      to: "/workout",
      icon: (
        <BicepsFlexed className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      to: "/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-row w-full h-screen bg-gray-100 dark:bg-neutral-800"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-5 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <EditProfileDialog
            name={name}
            profilePicture={profilePicture}
            open={open}
          />
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="dashboard"
      className="font-normal flex space-x-3 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        FitBoard
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};
