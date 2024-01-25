"use client";

import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

import { UserMenu } from "@/app/dashboard/components/user-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-v2";
import { useState } from "react";
import { useCourseQuery } from "@/lib/api/courses";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: {
    id: number;
  };
};

const CoursePage = ({ params: { id } }: Props) => {
  const [activeTab, setActiveTab] = useState("materials");

  const courseQuery = useCourseQuery(id);

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
              {courseQuery.isPending && (
                <Skeleton className="h-[28px] w-[100px]" />
              )}

              {courseQuery.error && (
                <p className="scroll-m-20 text-xl font-semibold tracking-tight text-red-500">
                  Error
                </p>
              )}

              {courseQuery.data && (
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {courseQuery.data.title}
                </h4>
              )}
            </Link>
          </div>

          <UserMenu />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </main>
  );
};

export default CoursePage;
