import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "@/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Sign-up
  const signUpUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("there was a problem signing in:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  // Sign-In
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (!error) {
        console.error("sign in error: ", error);
        return { success: false, error: error.message };
      }
      console.log("signin success", data);
      return { success: true, data };
    } catch (error) {
      console.error("an error occurred:", error);
    }
  };

  // Sign-out
  const signOutUser = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("there was an error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signUpUser, signInUser, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
