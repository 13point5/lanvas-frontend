import { CourseChat } from "@/app/types";
import { Button } from "@/components/ui/button";

type Props = {
  name: CourseChat["title"];
  active: boolean;
  onClick: () => void;
};

export const ChatItem = ({ name = "Untitled", active, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`w-full justify-start ${
        active && "bg-slate-800 text-white hover:bg-slate-800 hover:text-white"
      }`}
    >
      {name}
    </Button>
  );
};
