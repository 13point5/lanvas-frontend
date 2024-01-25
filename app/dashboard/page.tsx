"use client";

import { useCoursesApi } from "@/lib/api/courses";
import { useQuery } from "@tanstack/react-query";
import { CoursePreviewCard } from "@/app/dashboard/components/course-preview-card";
import { NewCourseButton } from "@/app/dashboard/components/new-course-button";

const DashboardPage = () => {
  const { getUserCourses } = useCoursesApi();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["userCourses"],
    queryFn: getUserCourses,
  });

  console.log("data", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || isError) {
    return <p>Error</p>;
  }

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-5">
      <div className="flex gap-4 items-center">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <NewCourseButton />
      </div>

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
    </div>
  );
};

export default DashboardPage;
