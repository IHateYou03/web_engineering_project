import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import DotGrid from "@/components/ui/DotGrid";
import { useState } from "react";
import { UserAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router";
import { ThemeProvider } from "@/components/ThemeProvider";

interface loginProps {
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login = ({
  buttonText = "Login",
  signupText = "Don't have an account?",
  signupUrl = "./signup",
}: loginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate();

  //console.log(session);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInUser(email, password); // Call context function

      if (result.success) {
        navigate("/dashboard"); // Navigate to dashboard on success
      } else {
        setError(result.error.message); // Show error message on failure
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <section className="relative h-screen overflow-hidden bg-black">
        {/* DotGrid háttér */}
        <div className="absolute inset-0 z-0">
          <DotGrid
            dotSize={2}
            gap={26}
            baseColor="#666666"
            activeColor="#ffffff"
            proximity={90}
            className="w-full h-full"
          />
        </div>

        {/* Signin panel */}
        <div className="flex h-full items-center justify-center relative z-10">
          <div className="bg-neutral-900 text-white flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-neutral-700 px-6 py-12 shadow-md">
            <div className="flex flex-col items-center gap-y-2">
              <h1
                className="text-3xl font-semibold"
                style={{ fontFamily: "Plutur" }}
              >
                Fitboard
              </h1>
            </div>

            <form
              onSubmit={handleSignIn}
              className="flex w-full flex-col gap-8"
            >
              {/* EMAIL */}
              <div className="flex flex-col gap-1">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-1">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Loading..." : buttonText}
              </Button>
            </form>

            <div className="text-neutral-400 flex justify-center gap-1 text-sm">
              <p>{signupText}</p>
              <a
                href={signupUrl}
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </a>
            </div>

            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export { Login };
