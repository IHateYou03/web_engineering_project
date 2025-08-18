import { UserAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { useState } from "react";
import { Calendar } from "@/components/ui/mini-calendar";
import { Statcard } from "@/components/ui/stat-card";
import { RecentWorkouts } from "@/components/ui/RecentWorkouts";
import { PersonalRecords } from "@/components/ui/personalrecord";

export default function dashboardPage() {
  const { session, signOutUser } = UserAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log(session);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error(error);
      setError("Could not fetch profile.");
    } else {
      setName(data?.name ?? null);
    }
  };
  fetchProfile();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <main className="flex-1 bg-neutral-900 rounded-tl-3xl p-8 overflow-auto">
      <header className="mb-5">
        <h1 className="text-5xl font-extrabold text-white mb- uppercase">
          Welcome back, {name}!
        </h1>
        <p className="text-gray-400 text-lg">Track. Train. Transform.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(300px,auto)]">
        {/* Top row */}
        <Statcard /> {/* Nutrition */}
        <PersonalRecords /> {/* Personal Records */}
        {/* Bottom row */}
        <Calendar /> {/* Activity Tracker */}
        <RecentWorkouts /> {/* Recent Workouts */}
      </div>
    </main>
  );
}
