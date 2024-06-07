"use client";

import {
  FileIcon,
  FolderSymlinkIcon,
  MoreVerticalIcon,
  PencilIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoolean } from "@/lib/hooks/useBoolean";
import RenameDialog from "@/app/course/[id]/components/file-card-v2/rename-dialog";
import { useMoveCourseMaterialMutation } from "@/lib/hooks/api/courseMaterials";
import MoveCourseContentDialog from "@/components/move-course-content-dialog";
import { Course, CourseFolder, CourseMaterial } from "@/app/types";

type Props = {
  id: CourseMaterial["id"];
  name: CourseMaterial["name"];
  courseId: Course["id"];
};

const FileCard = ({ id, courseId, name }: Props) => {
  const renameDialogState = useBoolean();
  const moveDialogState = useBoolean();

  const mutation = useMoveCourseMaterialMutation();

  const handleMove = async (folderId: CourseFolder["parent_id"]) => {
    await mutation.mutateAsync({
      courseId,
      id,
      folderId,
    });

    moveDialogState.off();
  };

  return (
    <>
      <div className="flex gap-4 items-center justify-between px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
        <div className="flex gap-2 items-center w-[85%]">
          <FileIcon className="text-gray-400" size={20} />
          <p className="text-sm font-medium truncate w-[80%] max-w-[80%]">
            {name}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-300 rounded-full p-2 w-fit h-fit">
            <MoreVerticalIcon className="" size={18} />
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

      {renameDialogState.value && (
        <RenameDialog
          open={renameDialogState.value}
          onOpenChange={renameDialogState.setValue}
          id={id}
          courseId={courseId}
          name={name}
        />
      )}

      {moveDialogState.value && (
        <MoveCourseContentDialog
          title="Move Material"
          open={moveDialogState.value}
          onOpenChange={moveDialogState.setValue}
          onMove={handleMove}
          loading={mutation.isPending}
        />
      )}
    </>
  );
};

export default FileCard;
