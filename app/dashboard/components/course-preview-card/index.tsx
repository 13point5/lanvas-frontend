import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  id: number;
  title: string;
  role: string;
};

const colors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-green-400",
  "bg-teal-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-pink-400",
  "bg-rose-400",
];

export const CoursePreviewCard = ({ id, title, role }: Props) => {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link href={`/course/${id}`}>
      <div className="bg-white flex flex-col rounded-md shadow-md w-[300px] h-[250px] hover:scale-105">
        <div className={`w-full h-[60%] ${color} rounded-t-md`}></div>

        <div className="px-4 py-2 flex gap-2 w-full justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-lg font-normal truncate">
                {title}
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Badge variant="secondary">{role}</Badge>
        </div>
      </div>
    </Link>
  );
};
