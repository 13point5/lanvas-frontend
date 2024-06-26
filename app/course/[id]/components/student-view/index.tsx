import { UserMenu } from "@/app/dashboard/components/user-menu";
import { AccessLevel, Course } from "@/app/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircleIcon,
  ChevronRightIcon,
  HomeIcon,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-v2";
import MaterialsTabV2 from "@/app/course/[id]/components/materials-tab-v2";
import ChatsTab from "@/app/course/[id]/components/chats-tab";

enum TabTypes {
  Materials = "materials",
  Chats = "chats",
}

type Props = {
  course: Course | null;
  isLoading: boolean;
  isError: boolean;
};

const StudentView = ({ course, isLoading, isError }: Props) => {
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Materials);

  const handleActiveTabChange = (value: string) => {
    setActiveTab(value as TabTypes);
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="flex flex-col gap-2 pt-4 px-6 border-b">
        <div className="flex items-center justify-between">
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
              <TabsTrigger value={TabTypes.Materials}>Materials</TabsTrigger>
              <TabsTrigger value={TabTypes.Chats}>Chats</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {course && (
        <div className="w-full px-6 py-8 flex flex-col">
          {activeTab === TabTypes.Materials && (
            <MaterialsTabV2
              courseId={course.id}
              accessLevel={AccessLevel.Read}
            />
          )}

          {activeTab === TabTypes.Chats && <ChatsTab courseId={course.id} />}
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

export default StudentView;
