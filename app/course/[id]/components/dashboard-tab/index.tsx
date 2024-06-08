"use client";

import { CourseId } from "@/app/types";
import { ChartCard } from "@/components/charts/chart-card";
import { useCourseChatTopicsQuery } from "@/lib/hooks/api/courseAnalytics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  courseId: CourseId;
};

export const DashboardTab = ({ courseId }: Props) => {
  const topicsQuery = useCourseChatTopicsQuery(courseId);

  return (
    <ChartCard
      title="Topics Frequency"
      description="Frequency of topics discussed in messages"
    >
      <div className="w-[500px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={topicsQuery.data || []}
            margin={{
              top: 0,
              right: 30,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};
