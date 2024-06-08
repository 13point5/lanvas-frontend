import { CourseChatMisconception, CourseId } from "@/app/types";
import { ChartCard } from "@/components/charts/chart-card";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { useCourseChatMisconceptionsQuery } from "@/lib/hooks/api/courseAnalytics";
import { ColumnDef } from "@tanstack/react-table";

enum Severity {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

type MisconceptionItem = {
  id: CourseChatMisconception["id"];
  name: CourseChatMisconception["name"];
  count: CourseChatMisconception["count"];
  severity: Severity;
};

const getMisconceptionSeverity = (item: CourseChatMisconception): Severity => {
  if (item.count <= 10) {
    return Severity.Low;
  } else if (item.count <= 20) {
    return Severity.Medium;
  } else {
    return Severity.High;
  }
};

const transformData = (
  rawData: CourseChatMisconception[]
): MisconceptionItem[] => {
  return rawData.map((item) => ({
    id: item.id,
    name: item.name,
    count: item.count,
    severity: getMisconceptionSeverity(item),
  }));
};

const getSeverityBadgeClassname = (severity: Severity): string => {
  switch (severity) {
    case Severity.Low:
      return "bg-blue-200 text-blue-700";

    case Severity.Medium:
      return "bg-yellow-200 text-yellow-700";

    case Severity.High:
      return "bg-red-200 text-red-700";

    default:
      return "";
  }
};

const columns: ColumnDef<MisconceptionItem>[] = [
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity: Severity = row.getValue("severity");

      return (
        <Badge className={`${getSeverityBadgeClassname(severity)}`}>
          {severity}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Misconception",
  },
  {
    accessorKey: "count",
    header: "Frequency",
  },
];

type Props = {
  courseId: CourseId;
};

export const MisconceptionsTable = ({ courseId }: Props) => {
  const misconceptionsQuery = useCourseChatMisconceptionsQuery(courseId);

  return (
    <ChartCard
      title="Misconceptions"
      description="Common misconceptions found in students"
    >
      <DataTable
        columns={columns}
        data={transformData(misconceptionsQuery.data || [])}
      />
    </ChartCard>
  );
};
