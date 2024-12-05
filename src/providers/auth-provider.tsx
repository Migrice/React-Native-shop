import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
    session: Session | null
    user: any
    mouting: boolean
  }

const AuthContext = createContext<AuthData>({
    session:null,
    mouting:true,
    user:null
  })


export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [mouting, setMounting] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.log("error", error);
        } else {
          setUser(user);
        }
      }

      setMounting(false)
    };

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
    })
  }, []);

  return <AuthContext.Provider value={{session, mouting, user}}>{children}</AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext)