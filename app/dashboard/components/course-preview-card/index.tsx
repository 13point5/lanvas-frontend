import Link from "next/link";

type Props = {
  id: number;
  title: string;
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

export const CoursePreviewCard = ({ id, title }: Props) => {
  // choose random color from colors
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link href={`/course/${id}`}>
      <div className="bg-white flex flex-col rounded-md shadow-md w-[300px] h-[250px] hover:scale-105">
        <div className={`w-full h-[60%] ${color} rounded-t-md`}></div>

        <div className="px-4 py-2">
          <p className="text-lg font-normal text-wrap truncate">{title}</p>
        </div>
      </div>
    </Link>
  );
};
