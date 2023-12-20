"use client";

import { createContext, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type SupabaseAuthContextType = {
  accessToken: string | null;
};

export const SupabaseAuthContext = createContext<SupabaseAuthContextType>({
  accessToken: null,
});

const SupabaseAuthProvider = ({
  accessToken,
  children,
}: {
  accessToken: SupabaseAuthContextType["accessToken"];
  children: React.ReactNode;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
};

export default SupabaseAuthProvider;
