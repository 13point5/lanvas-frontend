"use client";

import Link from "next/link";
import {
  AlertCircleIcon,
  ChevronRightIcon,
  HomeIcon,
  Loader2Icon,
} from "lucide-react";

import { UserMenu } from "@/app/dashboard/components/user-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-v2";
import { AccessLevel, Course } from "@/app/types";
import { useState } from "react";
import MaterialsTabV2 from "@/app/course/[id]/components/materials-tab-v2";
import ChatsTab from "@/app/course/[id]/components/chats-tab";
import { Skeleton } from "@/components/ui/skeleton";
import StudentsTab from "@/app/course/[id]/components/students-tab";
import { DashboardTab } from "@/app/course/[id]/components/dashboard-tab";

enum TabTypes {
  Dashboard = "dashboard",
  Materials = "materials",
  Students = "students",
  Chats = "chats",
}

type Props = {
  course: Course | null;
  isLoading: boolean;
  isError: boolean;
};

const TeacherView = ({ course, isLoading, isError }: Props) => {
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Dashboard);

  const handleActiveTabChange = (value: string) => {
    setActiveTab(value as TabTypes);
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="flex flex-col gap-2 pt-4 px-6 border-b h-[96px] sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between bg-white">
          <div className="flex gap-2 items-center">
            <Link href="/">
              <HomeIcon size={20} />
            </Link>

            <ChevronRightIcon size={20} />

            {course ? (
              <Link href={`/course/${course.id}`}>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {course.title}
                </h4>
              </Link>
            ) : (
              <Skeleton className="w-[100px] h-[20px] rounded-sm" />
            )}
          </div>

          <UserMenu />
        </div>

        {!isLoading && (
          <Tabs value={activeTab} onValueChange={handleActiveTabChange}>
            <TabsList className="">
              <TabsTrigger value={TabTypes.Dashboard}>Dashboard</TabsTrigger>
              <TabsTrigger value={TabTypes.Materials}>Materials</TabsTrigger>
              <TabsTrigger value={TabTypes.Chats}>Chats</TabsTrigger>
              <TabsTrigger value={TabTypes.Students}>Students</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {course && (
        <div className="w-full px-6 py-8 flex flex-col">
          {activeTab === TabTypes.Dashboard && (
            <DashboardTab courseId={course.id} />
          )}

          {activeTab === TabTypes.Materials && (
            <MaterialsTabV2
              courseId={course.id}
              accessLevel={AccessLevel.Edit}
            />
          )}

          {activeTab === TabTypes.Chats && <ChatsTab courseId={course.id} />}

          {activeTab === TabTypes.Students && (
            <StudentsTab courseId={course.id} />
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-centerfull px-6 py-8">
          <div className="flex gap-2 items-center">
            <Loader2Icon className="animate-spin" size={24} />
            <span className="text-lg">Fetching Course</span>
          </div>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-centerfull px-6 py-8">
          <div className="flex gap-2 items-center justify-center rounded-md bg-red-100 p-2">
            <AlertCircleIcon size={24} className="text-red-500" />
            <span className="text-lg text-red-500">Error Fetching Course</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default TeacherView;
