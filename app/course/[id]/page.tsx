"use client";

import { useCourseQuery } from "@/lib/hooks/api/courses";
import { CourseMemberRole } from "@/app/types";
import StudentView from "@/app/course/[id]/components/student-view";
import TeacherView from "@/app/course/[id]/components/teacher-view";

type Props = {
  params: {
    id: number;
  };
};

const CoursePage = ({ params: { id } }: Props) => {
  const courseQuery = useCourseQuery(id);

  if (courseQuery.data?.role === CourseMemberRole.student) {
    return (
      <StudentView
        course={courseQuery.data?.course || null}
        isLoading={courseQuery.isPending}
        isError={courseQuery.isError}
      />
    );
  }

  return (
    <TeacherView
      course={courseQuery.data?.course || null}
      isLoading={courseQuery.isPending}
      isError={courseQuery.isError}
    />
  );
};

export default CoursePage;
