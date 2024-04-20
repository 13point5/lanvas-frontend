"use client";

import { CoursePreviewCard } from "@/app/dashboard/components/course-preview-card";
import { NewCourseButton } from "@/app/dashboard/components/new-course-button";
import { useCoursesQuery } from "@/lib/hooks/api/courses";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";

const DashboardPage = () => {
  const { isLoading, isError, data } = useCoursesQuery();

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-5">
      <div className="flex gap-4 items-center">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <NewCourseButton />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="flex gap-2 items-center">
            <Loader2Icon className="animate-spin" size={24} />
            <span className="text-lg">Fetching Courses</span>
          </div>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center">
          <div className="flex gap-2 items-center justify-center rounded-md bg-red-100 p-2">
            <AlertCircleIcon size={24} className="text-red-500" />
            <span className="text-lg text-red-500">Error Fetching Courses</span>
          </div>
        </div>
      )}

      {data && (
        <div className="flex gap-6 flex-wrap">
          {data.map(({ role, course }) => (
            <CoursePreviewCard
              key={course.id}
              id={course.id}
              title={course.title}
              role={role}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
