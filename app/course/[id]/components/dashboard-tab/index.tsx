"use client";

import { MisconceptionsTable } from "@/app/course/[id]/components/dashboard-tab/misconceptions-table";
import { TopicFreqChart } from "@/app/course/[id]/components/dashboard-tab/topic-freq-chart";
import { CourseId } from "@/app/types";

type Props = {
  courseId: CourseId;
};

export const DashboardTab = ({ courseId }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <TopicFreqChart courseId={courseId} />

      <MisconceptionsTable courseId={courseId} />
    </div>
  );
};
