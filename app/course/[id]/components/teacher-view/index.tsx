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
import MaterialsTabV2 from "@/app/course/[id]/components/materials-tab-v2";

enum TabTypes {
  Materials = "materials",
  Students = "students",
}

type Props = {
  course: Course;
};

const TeacherView = ({ course }: Props) => {
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Materials);

  const handleActiveTabChange = (value: string) => {
    setActiveTab(value as TabTypes);
  };

  return (
    <main className="h-screen">
      <div className="flex flex-col gap-2 pt-4 px-6 border-b">
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
            <TabsTrigger value={TabTypes.Materials}>Materials</TabsTrigger>
            <TabsTrigger value={TabTypes.Students}>Students</TabsTrigger>
            {/* <TabsTrigger value="chat">Chat</TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>

      <div className="w-full h-full px-6 py-8 flex flex-col gap-5">
        {activeTab === "materials" && <MaterialsTabV2 courseId={course.id} />}
      </div>
    </main>
  );
};

export default TeacherView;
