import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Sign up
  const signUpUser = async (name, email, password) => {
    function isValidName(name) {
      const regex = /^[a-zA-Z ]{3,40}$/;
      return regex.test(name);
    }

    if (!isValidName(name)) {
      console.error("Name is invalid");
      return {
        success: false,
        error: { message: "Name is invalid." },
      };
    }

    function isValidEmail(email) {
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }

    if (!isValidEmail(email)) {
      console.error("Email is not valid");
      return {
        success: false,
        error: { message: "Invalid email format." },
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id, // user uuid az auth.users táblából
      name: name, // itt mentjük a nevet
    });

    if (profileError) {
      return { success: false, error: profileError };
    }

    return { success: true, data };
  };

  // Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      // Handle Supabase error explicitly
      if (error) {
        console.error("Sign-in error:", error.message); // Log the error for debugging
        return { success: false, error }; // Return the error
      }

      // If no error, return success
      console.log("Sign-in success:", data);
      return { success: true, data }; // Return the user data
    } catch (error) {
      // Handle unexpected issues
      console.error("Unexpected error during sign-in:", err.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Sign out
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUpUser, signInUser, session, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
