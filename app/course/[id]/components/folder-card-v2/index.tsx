import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FolderIcon,
  FolderSymlinkIcon,
  MoreVerticalIcon,
  PencilIcon,
} from "lucide-react";

type Props = {
  id: number;
  courseId: number;
  name: string;
  onClick: (id: number) => void;
};

const FolderCardV2 = ({ id, courseId, name, onClick }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    onClick(id);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex gap-4 items-center justify-between px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
      >
        <div className="flex gap-4 items-center">
          <FolderIcon className="text-gray-400" size={18} />
          <p className="text-sm font-medium ">{name}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-300 rounded-full p-2 w-fit h-fit"
            >
              <MoreVerticalIcon className="" size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                // renameDialogState.on();
              }}
            >
              <PencilIcon className="mr-4" size={14} /> Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                // moveDialogState.on();
              }}
            >
              <FolderSymlinkIcon className="mr-4" size={14} /> Move
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FolderCardV2;
