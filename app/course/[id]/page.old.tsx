"use client";

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

import { useCoursesApi } from "@/lib/api/courses";
import { useCourseFoldersApi } from "@/lib/api/courseFolders";
import { useCourseMaterialsApi } from "@/lib/api/courseMaterials";
import { useCourseMembersApi } from "@/lib/api/courseMembers";

import StudentsTab from "@/app/course/[id]/components/students-tab";
import {
  Course,
  CourseFolder,
  CourseMaterial,
  CourseMember,
  FormStatus,
} from "@/app/types";
import { useEffect, useState } from "react";
import MaterialsTab from "@/app/course/[id]/components/materials-tab";
import ChatTab from "@/app/course/[id]/components/chat-tab";

type CourseDataState =
  | {
      status: FormStatus.Idle;
      data: null;
      error: null;
    }
  | {
      status: FormStatus.Loading;
      data: null;
      error: null;
    }
  | {
      status: FormStatus.Success;
      data: Course;
      error: null;
    }
  | {
      status: FormStatus.Error;
      data: null;
      error: string;
    };

type Props = {
  params: {
    id: number;
  };
};

export default function CoursePage({ params: { id } }: Props) {
  console.log("id", id);

  const [activeTab, setActiveTab] = useState("materials");

  const { getCourse } = useCoursesApi();
  const { getCourseFolders } = useCourseFoldersApi();
  const { getCourseMaterials } = useCourseMaterialsApi();
  const { getCourseMembers } = useCourseMembersApi();

  const [courseData, setCourseData] = useState<CourseDataState>({
    status: FormStatus.Idle,
    data: null,
    error: null,
  });

  const fetchCourse = async () => {
    if (courseData.status === FormStatus.Loading) {
      return;
    }

    setCourseData({
      status: FormStatus.Loading,
      data: null,
      error: null,
    });

    try {
      const courseResp = await getCourse({ id });

      const [foldersResp, materialsResp, membersResp] = await Promise.all([
        getCourseFolders({ courseId: id }),
        getCourseMaterials({ courseId: id }),
        getCourseMembers({ courseId: id }),
      ]);

      setCourseData({
        status: FormStatus.Success,
        data: {
          ...courseResp,
          course_folders: foldersResp.data,
          course_materials: materialsResp.data,
          course_members: membersResp.data,
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      setCourseData({
        status: FormStatus.Error,
        data: null,
        error: "Could not fetch course",
      });
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleUpdateCourseMembers = (members: CourseMember[]) => {
    setCourseData((prev) => {
      if (!prev.data) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          course_members: members,
        },
      };
    });
  };

  const handleAddCourseMaterials = (materials: CourseMaterial[]) => {
    setCourseData((prev) => {
      if (!prev.data) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          course_materials: [...prev.data.course_materials, ...materials],
        },
      };
    });
  };

  const handleUpdateCourseMaterial = (material: CourseMaterial) => {
    setCourseData((prev) => {
      if (!prev.data) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          course_materials: prev.data.course_materials.map((m) => {
            if (m.id === material.id) {
              return material;
            }
            return m;
          }),
        },
      };
    });
  };

  const handleAddCourseFolder = (folder: CourseFolder) => {
    setCourseData((prev) => {
      if (!prev.data) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          course_folders: [...prev.data.course_folders, folder],
        },
      };
    });
  };

  const handleUpdateFolder = (folder: CourseFolder) => {
    setCourseData((prev) => {
      if (!prev.data) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          course_folders: prev.data.course_folders.map((f) => {
            if (f.id === folder.id) {
              return folder;
            }
            return f;
          }),
        },
      };
    });
  };

  if (
    courseData.status === FormStatus.Loading ||
    courseData.status === FormStatus.Idle
  ) {
    return <div>Loading...</div>;
  }

  if (courseData.status === FormStatus.Error) {
    return <div>Error</div>;
  }

  const course = courseData.data;
  console.log("course", course);

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
                {courseData.data.title}
              </h4>
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

      <div className="w-full h-full px-6 py-8 flex flex-col gap-5">
        {activeTab === "materials" && (
          <MaterialsTab
            courseId={id}
            materials={course.course_materials}
            onAddMaterials={handleAddCourseMaterials}
            onUpdateMaterial={handleUpdateCourseMaterial}
            folders={course.course_folders}
            onAddFolder={handleAddCourseFolder}
            onUpdateFolder={handleUpdateFolder}
          />
        )}

        {activeTab === "students" && (
          <StudentsTab
            members={course.course_members}
            onUpdateMembers={handleUpdateCourseMembers}
          />
        )}

        {activeTab === "chat" && <ChatTab courseId={id} />}
      </div>
    </main>
  );
}
