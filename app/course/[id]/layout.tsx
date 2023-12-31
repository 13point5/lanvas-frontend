import { Database } from "@/app/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-v2";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, HomeIcon, SlashIcon, UserIcon } from "lucide-react";
import { UserMenu } from "@/app/dashboard/components/user-menu";

export default async function CourseLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: {
    id: number;
  };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="h-screen">
      <div className="flex flex-col gap-2 pt-4 px-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Link href="/">
              <HomeIcon size={20} />
            </Link>

            <ChevronRightIcon size={20} />

            <Link href={`/course/${id}`}>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Alb2
              </h4>
            </Link>
          </div>

          <UserMenu />
        </div>

        <Tabs defaultValue="materials" className="">
          <TabsList className="">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </main>
  );
}
