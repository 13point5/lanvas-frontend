"use client";

import { useCoursesApi } from "@/lib/api/courses";
import { useQuery } from "@tanstack/react-query";
import { CoursePreviewCard } from "@/app/dashboard/components/course-preview-card";

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
      <h2 className="text-3xl font-bold tracking-tight">Courses</h2>

      <div className="flex gap-6 flex-wrap">
        {data.data.map(({ role, course }) => (
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
