import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DotGrid from "@/components/ui/DotGrid";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { UserAuth } from "@/components/ui/AuthContext";

interface Login1Props {
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login = ({
  buttonText = "Login",
  signupText = "Don't have an account?",
  signupUrl = "./signup",
}: Login1Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { session } = UserAuth();
  console.log(session);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        value.trim().length < 6
          ? "Password must be at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3500/login", values);
      alert(`Welcome back, ${response.data.user.name}!`);
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
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

      {/* Login panel */}
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
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex w-full flex-col gap-8"
          >
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                placeholder="Email"
                {...form.getInputProps("email")}
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              {form.errors.email && (
                <span className="text-red-500 text-sm">
                  {form.errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Input
                type="password"
                placeholder="Password"
                {...form.getInputProps("password")}
                className="bg-neutral-800 border-neutral-700 text-white"
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
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
