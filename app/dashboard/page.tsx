import { Database } from "@/app/supabase.types";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleCourses } from "@/app/dashboard/sample-data/courses";
import { CoursePreviewCard } from "@/app/dashboard/components/course-preview-card";
import { NewCourseButton } from "@/app/dashboard/components/new-course-button";
import { redirect } from "next/navigation";
import { Dashboard } from "@/app/dashboard/components/dashboard";

const DashboardPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/");
  }

  const data = await supabase
    .from("course_members")
    .select(
      `
      role,
      courses (
        id,
        title
      )
    `
    )
    .eq("email", user.email);
  console.log("data", data);

  if (data.error) {
    return <div>Error</div>;
  }

  const filteredCourses = data.data.filter(
    (item) => item.courses && item.courses?.id && item.courses?.title
  ) as Array<{
    role: string;
    courses: {
      id: number;
      title: string;
    };
  }>;

  const courses = filteredCourses.map((item) => ({
    id: item.courses.id,
    title: item.courses.title,
    role: item.role,
  }));

  return <Dashboard courses={courses} />;
};

export default DashboardPage;
