import { UserAuth } from "@/components/ui/AuthContext";
import { useNavigate } from "react-router";

export default function dashboardPage() {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  console.log(session);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hello, {session?.user?.email}</h1>
      <p
        onClick={handleSignOut}
        classname="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
      >
        Sign Out
      </p>
    </div>
  );
}
