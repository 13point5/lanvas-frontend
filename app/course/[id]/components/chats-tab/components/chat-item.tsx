import { CourseChat } from "@/app/types";
import { Button } from "@/components/ui/button";

type Props = {
  name: CourseChat["title"];
};

export const ChatItem = ({ name = "Untitled" }: Props) => {
  return (
    <Button variant="ghost" className="w-full justify-start">
      {name}
    </Button>
  );
};
