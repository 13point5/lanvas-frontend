import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLinkIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const ModuleConcepts = () => {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-lg font-semibold tracking-tight">
        Materials and Concepts
      </h5>

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(420px,1fr))]">
        <MaterialOverview name="Material 1" />
        <MaterialOverview name="Material 2" />
        <MaterialOverview name="Material 3" />
      </div>
    </div>
  );
};

type DataShape = {
  name: string;
  understood: number;
  summarised: number;
  struggling: number;
};

const data2: DataShape[] = [
  {
    name: "Concept 1",
    understood: 80,
    summarised: 70,
    struggling: 20,
  },
  {
    name: "Concept 2",
    understood: 60,
    summarised: 20,
    struggling: 40,
  },
  {
    name: "Concept 3",
    understood: 100,
    summarised: 50,
    struggling: 50,
  },
];

function MaterialOverview({ name }: { name: string }) {
  const handleBarClick = (data: any, index: number) => {
    console.log("index, data", index, data);
  };

  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-2">
      <div className="flex gap-4 w-full items-center justify-between">
        <h6 className="text-md font-semibold tracking-tight">{name}</h6>

        <MaterialInsightsDialog />
      </div>

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
            dataKey="understood"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
            // className="fill-primary"
          />

          <Bar
            onClick={handleBarClick}
            dataKey="summarised"
            fill="#82ca9d"
            radius={[4, 4, 0, 0]}
            // className="fill-primary"
          />

          <Bar
            onClick={handleBarClick}
            dataKey="struggling"
            fill="#e2f3a2"
            radius={[4, 4, 0, 0]}
            // className="fill-primary"
          />

          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const MaterialInsightsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="w-fit" size="sm">
          <ExternalLinkIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[800px] max-w-[800px]">
        <img src="/gdoc-comments.webp" alt="gdoc-comments" />
      </DialogContent>
    </Dialog>
  );
};
