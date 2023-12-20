import { Database } from "@/app/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { UserMenu } from "@/app/dashboard/components/user-menu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user", user);

  if (!user) {
    redirect("/");
  }

  return (
    <main>
      <div className="py-4 px-6 border-b flex items-center justify-between">
        <Link href="/">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            CourseLM
          </h4>
        </Link>

        <UserMenu />
      </div>

      {children}
    </main>
  );
}
