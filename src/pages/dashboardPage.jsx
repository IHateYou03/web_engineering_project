import { UserAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { useState } from "react";

export default function dashboardPage() {
  const { session, signOutUser } = UserAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");

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
    <div>
      <h1>Dashboard</h1>
      <h2>
        {" "}
        Welcome, {name} ({session?.user?.email})
      </h2>
      <div>
        <p
          onClick={handleSignOut}
          className="hover:cursor-pointer  border inline-block px-4 py-3 mt-4 "
        >
          Sign out
        </p>
      </div>
    </div>
  );
}
