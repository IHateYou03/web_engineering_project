import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DotGrid from "@/components/ui/DotGrid";
import { ThemeProvider } from "@/components/theme_provider";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { UserAuth } from "@/components/ui/AuthContext";
import { useNavigate } from "react-router";

interface signUpProps {
  buttonText?: string;
  signinText?: string;
  signinUrl?: string;
}

const Signup = ({
  buttonText = "Sign up",
  signinText = "Have already an account?",
  signinUrl = "./",
}: signUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session, signUpUser } = UserAuth();
  const navigate = useNavigate();
  console.log(session);
  console.log(email, password);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("an error occurred:");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value) =>
        value.trim().length < 3 ? "Name must be at least 3 characters" : null,

      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())
          ? null
          : "Invalid email",

      password: (value) =>
        value.trim().length < 6
          ? "Password must be at least 6 characters"
          : null,
    },
  });

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

        {/* Signup panel */}
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
              onSubmit={handleSignUp}
              className="flex w-full flex-col gap-8"
            >
              {/* NAME */}
              <div className="flex flex-col gap-1">
                <Input
                  type="text" // <- helyes típus
                  placeholder="Name"
                  autoComplete="name"
                  {...form.getInputProps("name")}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
                {form.errors.name && ( // <- email helyett name-et figyelj!
                  <span className="text-red-500 text-sm">
                    {form.errors.name}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-1">
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  {...form.getInputProps("email")}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {form.errors.email && (
                  <span className="text-red-500 text-sm">
                    {form.errors.email}
                  </span>
                )}
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-1">
                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  {...form.getInputProps("password")}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {form.errors.password && (
                  <span className="text-red-500 text-sm">
                    {form.errors.password}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="mt-2 w-full bg-primary hover:bg-primary/90"
              >
                {buttonText}
              </Button>
            </form>

            <div className="text-neutral-400 flex justify-center gap-1 text-sm">
              <p>{signinText}</p>
              <a
                href={signinUrl}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </a>
              {error && (
                <p className="text-red-600 text-center pt-4">{error}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export { Signup };
