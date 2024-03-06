import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const EngagementAndUnderstandingInsights = () => {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-md font-semibold tracking-tight">
        Insights on Engagement and Understanding
      </h5>

      <Overview />
    </div>
  );
};

type EngagementAndUnderstandingData = {
  name: string;
  engagement: number;
  understanding: number;
};

const data2: EngagementAndUnderstandingData[] = [
  {
    name: "Module 1",
    engagement: 80,
    understanding: 70,
  },
  {
    name: "Module 2",
    engagement: 60,
    understanding: 20,
  },
  {
    name: "Module 3",
    engagement: 100,
    understanding: 50,
  },
  {
    name: "Module 4",
    engagement: 60,
    understanding: 40,
  },
  {
    name: "Module 5",
    engagement: 70,
    understanding: 70,
  },
  {
    name: "Module 6",
    engagement: 90,
    understanding: 30,
  },
  {
    name: "Module 7",
    engagement: 50,
    understanding: 10,
  },
  {
    name: "Module 8",
    engagement: 30,
    understanding: 25,
  },
  {
    name: "Module 9",
    engagement: 20,
    understanding: 20,
  },
  {
    name: "Module 10",
    engagement: 10,
    understanding: 10,
  },
];

export function Overview() {
  const handleBarClick = (data: any, index: number) => {
    console.log("index, data", index, data);
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data2}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <Bar
          onClick={handleBarClick}
          dataKey="engagement"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
          // className="fill-primary"
        />

        <Bar
          onClick={handleBarClick}
          dataKey="understanding"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
          // className="fill-primary"
        />

        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}
