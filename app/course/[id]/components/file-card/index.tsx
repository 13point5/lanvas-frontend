"use client";

import { Button } from "@/components/ui/button";
import {
  FileIcon,
  FolderIcon,
  FolderSymlinkIcon,
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
import RenameDialog from "@/app/course/[id]/components/file-card/rename-dialog";
import MoveDialog from "@/app/course/[id]/components/file-card/move-dialog";
import { CourseMaterial } from "@/app/types";
import { FoldersAndMaterialsTree } from "@/app/course/[id]/components/materials-tab";

type Props = {
  id: number;
  courseId: number;
  name: string;
  dataTree: FoldersAndMaterialsTree;
  onUpdate: (material: CourseMaterial) => void;
};

const FileCard = ({ id, courseId, name, dataTree, onUpdate }: Props) => {
  const renameDialogState = useBoolean();

  const moveDialogState = useBoolean();

  return (
    <>
      <div className="flex gap-4 items-center justify-between px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
        <div className="flex gap-4 items-center max-w-[80%]">
          <FileIcon className="text-gray-400 w-5 h-5" />
          <p className="text-sm font-medium truncate">{name}</p>
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

                renameDialogState.on();
              }}
            >
              <PencilIcon className="mr-4" size={14} /> Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                moveDialogState.on();
              }}
            >
              <FolderSymlinkIcon className="mr-4" size={14} /> Move
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <RenameDialog
        id={id}
        courseId={courseId}
        name={name}
        open={renameDialogState.value}
        onOpenChange={renameDialogState.setValue}
        onSuccess={onUpdate}
      />

      <MoveDialog
        id={id}
        courseId={courseId}
        open={moveDialogState.value}
        onOpenChange={moveDialogState.setValue}
        dataTree={dataTree}
        onSuccess={onUpdate}
      />

      {/* <RenameFolderDialog
        id={id}
        courseId={courseId}
        name={name}
        open={renameDialogState.value}
        onOpenChange={renameDialogState.setValue}
        onSuccess={onUpdate}
      />

      <MoveFolderDialog
        id={id}
        courseId={courseId}
        open={moveDialogState.value}
        onOpenChange={moveDialogState.setValue}
        dataTree={dataTree}
        onSuccess={onUpdate}
      /> */}
    </>
  );
};

export default FileCard;
