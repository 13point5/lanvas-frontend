"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTab from "@/app/course/[id]/components/students-tab";
import { useCoursesApi } from "@/lib/api/courses";
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

  const { getCourse } = useCoursesApi();

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
      const res = await getCourse({ id });
      setCourseData({
        status: FormStatus.Success,
        data: res.data,
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
    <div className="w-full h-full px-6 py-8 flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight">{course.title}</h2>

      <Tabs defaultValue="materials" className="">
        <TabsList className="mb-6">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="materials">
          <MaterialsTab
            courseId={id}
            materials={course.course_materials}
            onAddMaterials={handleAddCourseMaterials}
            folders={course.course_folders}
            onAddFolder={handleAddCourseFolder}
            onUpdateFolder={handleUpdateFolder}
          />
        </TabsContent>

        <TabsContent value="students">
          <StudentsTab
            members={course.course_members}
            onUpdateMembers={handleUpdateCourseMembers}
          />
        </TabsContent>

        <TabsContent value="chat" className="h-full">
          <ChatTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
