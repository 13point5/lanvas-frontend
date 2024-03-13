import RenameFolderDialog from "@/app/course/[id]/components/folder-card-v2/rename-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseFolder } from "@/lib/api/courseFolders";
import { Course } from "@/lib/api/courses";
import { useBoolean } from "@/lib/hooks/useBoolean";
import {
  FolderIcon,
  FolderSymlinkIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  useDeleteCourseFolderMutation,
  useMoveCourseFolderMutation,
} from "@/lib/hooks/api/courseFolders";
import MoveCourseContentDialog from "@/components/move-course-content-dialog";

type Props = {
  id: CourseFolder["id"];
  name: CourseFolder["name"];
  courseId: Course["id"];
  onClick: (id: number) => void;
};

const FolderCardV2 = ({ id, courseId, name, onClick }: Props) => {
  const renameDialogState = useBoolean();
  const moveDialogState = useBoolean();

  const moveMutation = useMoveCourseFolderMutation();
  const deleteMutation = useDeleteCourseFolderMutation();

  const handleMove = async (destinationFolderId: CourseFolder["parent_id"]) => {
    if (destinationFolderId === id) {
      return;
    }

    await moveMutation.mutateAsync({
      courseId,
      id,
      parentId: destinationFolderId,
    });

    moveDialogState.off();
  };

  const handleDeleteItemClick: React.MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await deleteMutation.mutate({ courseId, id });
  };

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

            <DropdownMenuItem onClick={handleDeleteItemClick}>
              <TrashIcon className="mr-4" size={14} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {renameDialogState.value && (
        <RenameFolderDialog
          id={id}
          courseId={courseId}
          name={name}
          open={renameDialogState.value}
          onOpenChange={renameDialogState.setValue}
        />
      )}

      {moveDialogState.value && (
        <MoveCourseContentDialog
          title="Move Folder"
          open={moveDialogState.value}
          onOpenChange={moveDialogState.setValue}
          onMove={handleMove}
          loading={moveMutation.isPending}
        />
      )}
    </>
  );
};

export default FolderCardV2;
