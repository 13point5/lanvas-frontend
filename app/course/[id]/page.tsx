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
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [activeTab, setActiveTab] = useState("materials");

  const courseQuery = useCourseQuery(id);

  if (courseQuery.isPending) {
    return <p>loading...</p>;
  }

  if (courseQuery.isError) {
    return <p>error</p>;
  }

  if (courseQuery.data.role === CourseMemberRole.student) {
    return <StudentView />;
  }

  return <TeacherView course={courseQuery.data.course} />;
};

export default CoursePage;
