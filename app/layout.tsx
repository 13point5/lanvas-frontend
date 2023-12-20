import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import SupabaseAuthProvider from "@/lib/contexts/SupabaseAuthProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CourseLM",
  description: "Create and Share AI tools for courses with your students.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseAuthProvider accessToken={accessToken}>
          {children}
        </SupabaseAuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
