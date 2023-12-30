"use client";

import { Button } from "@/components/ui/button";
import {
  FolderIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoolean } from "@/lib/hooks/useBoolean";
import RenameFolderDialog from "@/app/course/[id]/components/folder-card/rename-dialog";
import { CourseFolder } from "@/app/types";

type Props = {
  id: number;
  courseId: number;
  name: string;
  onUpdate: (data: CourseFolder) => void;
};

const FolderCard = ({ id, courseId, name, onUpdate }: Props) => {
  const renameDialogState = useBoolean();

  const handleRename = (data: CourseFolder) => {
    onUpdate(data);
  };

  return (
    <>
      <Link href={`/course/${courseId}/folder/${id}`}>
        <div className="flex gap-4 items-center justify-between px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
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

                  renameDialogState.on();
                }}
              >
                <PencilIcon className="mr-4" size={14} /> Rename
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>

      <RenameFolderDialog
        id={id}
        courseId={courseId}
        name={name}
        open={renameDialogState.value}
        onOpenChange={renameDialogState.setValue}
        onRename={handleRename}
      />
    </>
  );
};

export default FolderCard;
