import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { SupabaseProvider } from "@/lib/contexts/Supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/components/react-query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lanvas",
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

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SupabaseProvider>

        <Toaster />
      </body>
    </html>
  );
}
