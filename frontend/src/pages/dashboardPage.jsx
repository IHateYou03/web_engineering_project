import { UserAuth } from "../components/auth/AuthContext";

import { supabase } from "../supabaseClient";

import { useState, useEffect } from "react";
import { Calendar } from "../components/ui/MiniCalendar";

import { Statcard } from "../components/ui/StatCard";

import { RecentWorkouts } from "../components/ui/RecentWorkouts";

import { PersonalRecords } from "../components/ui/PersonalRecords";

import Goals from "../components/ui/GoalsAndTargets";

export default function DashboardPage() {
  const { session } = UserAuth();
  const [name, setName] = useState("");

  console.log(session);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error(error);
        setError("Could not fetch profile.");
      } else {
        setName(data?.name ?? "");
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <main className="flex-1 bg-neutral-900 rounded-tl-4xl p-8 overflow-auto">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-white uppercase mb-2">
          Welcome back, {name}!
        </h1>
        <p className="text-gray-400 text-lg">Train. Track. Repeat.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 auto-rows-[minmax(300px,auto)]">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-stretch">
            <div className="flex-1">
              <div className="h-[280px]">
                <Statcard />
              </div>
            </div>
            <div className="flex-1">
              <div className="h-[280px]">
                <PersonalRecords />
              </div>
            </div>
          </div>
          <Calendar /> {/* Activity Tracker */}
        </div>

        {/* Jobb oszlop */}
        <div className="col-span-1 space-y-5">
          <RecentWorkouts /> {/* Recent Workouts */}
          <Goals /> {/* Goals & Targets */}
        </div>
      </div>
    </main>
  );
}
