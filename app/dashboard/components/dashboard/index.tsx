"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursePreviewCard } from "@/app/dashboard/components/course-preview-card";
import { NewCourseButton } from "@/app/dashboard/components/new-course-button";
import * as R from "ramda";

const groupByRole = R.groupBy((item: CourseData) => R.prop("role", item));

type CourseData = {
  id: number;
  title: string;
  role: string;
};

type Props = {
  courses: CourseData[];
};

export const Dashboard = ({ courses }: Props) => {
  const groupedCourses: {
    student?: CourseData[];
    teacher?: CourseData[];
  } = groupByRole(courses);

  console.log("groupedCourses", groupedCourses);

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-5">
      <Tabs defaultValue="student" className="">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-4 items-center">
            <h2 className="text-3xl font-bold tracking-tight">Courses</h2>

            <TabsList className="">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>
          </div>

          <NewCourseButton />
        </div>

        <TabsContent value="student">
          <div className="flex gap-6 flex-wrap">
            {(groupedCourses.student || []).map((course) => (
              <CoursePreviewCard
                key={course.id}
                id={course.id}
                title={course.title}
                role="Student"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teacher">
          <div className="flex gap-6 flex-wrap">
            {(groupedCourses.teacher || []).map((course) => (
              <CoursePreviewCard
                key={course.id}
                id={course.id}
                title={course.title}
                role="Teacher"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
