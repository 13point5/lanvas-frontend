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
import { Course } from "@/app/types";
import { useState } from "react";
import StudentsTab from "@/app/course/[id]/components/students-tab";

enum TabTypes {
  Materials = "materials",
  Students = "students",
  Chats = "chats",
}

type Props = {
  course: Course;
};

const TeacherView = ({ course }: Props) => {
  console.log("course", course);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Students);

  const handleActiveTabChange = (value: string) => {
    setActiveTab(value as TabTypes);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-2 pt-4 px-6 border-b h-[96px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Link href="/">
              <HomeIcon size={20} />
            </Link>

            <ChevronRightIcon size={20} />

            <Link href={`/course/${course.id}`}>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {course.title}
              </h4>
            </Link>
          </div>

          <UserMenu />
        </div>

        <Tabs value={activeTab} onValueChange={handleActiveTabChange}>
          <TabsList className="">
            <TabsTrigger value={TabTypes.Students}>Students</TabsTrigger>
            {/* <TabsTrigger value={TabTypes.Materials}>Materials</TabsTrigger> */}
            {/* <TabsTrigger value={TabTypes.Chats}>Chats</TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>

      <div className="w-full px-6 py-8 flex flex-col">
        {activeTab === TabTypes.Students && (
          <StudentsTab courseId={course.id} />
        )}
      </div>
    </main>
  );
};

export default TeacherView;
