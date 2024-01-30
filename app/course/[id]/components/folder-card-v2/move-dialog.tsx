import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseContentContext } from "@/lib/contexts/CourseContent";
import { FileIcon, Loader2Icon } from "lucide-react";
import { useContext, useState } from "react";
import * as TreeView from "@/components/tree-view";
import { CourseFolder } from "@/lib/api/courseFolders";
import {
  FoldersNormalised,
  MaterialsNormalised,
} from "@/app/course/[id]/components/materials-tab-v2/utils";
import { useMoveCourseFolderMutation } from "@/lib/hooks/api/courseFolders";
import { Course } from "@/lib/api/courses";

const renderNode = ({
  folderId,
  folders,
  materials,
}: {
  folderId: CourseFolder["id"];
  folders: FoldersNormalised;
  materials: MaterialsNormalised;
}) => {
  const folder = folders.byId.get(folderId);
  if (!folder) {
    return null;
  }

  const childrenFolderIds = folders.idsByParentId.get(folderId) || [];
  const childrenMaterialIds = materials.idsByFolderId.get(folderId) || [];

  return (
    <TreeView.Node key={folderId} id={folderId} label={folder.name}>
      {childrenFolderIds.map((folderId) =>
        renderNode({ folderId, folders, materials })
      )}

      {childrenMaterialIds.map((materialId) => (
        <TreeView.Node
          key={materialId}
          id={materialId}
          label={materials.byId.get(materialId)?.name || ""}
          disableSelect
          icons={{
            open: <FileIcon size={16} />,
            close: <FileIcon size={16} />,
          }}
        />
      ))}
    </TreeView.Node>
  );
};

type Props = {
  id: CourseFolder["id"];
  courseId: Course["id"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MoveFolderDialog = ({ open, onOpenChange, id, courseId }: Props) => {
  const [selectedNodeId, setSelectedNodeId] = useState<
    CourseFolder["id"] | null
  >(null);

  const courseContent = useContext(CourseContentContext);

  const rootFolderIds = courseContent.folders.idsByParentId.get(null) || [];

  const mutation = useMoveCourseFolderMutation();

  const handleMoveFolder = async () => {
    await mutation.mutateAsync({
      id,
      courseId,
      parentId: selectedNodeId,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move Folder</DialogTitle>
        </DialogHeader>

        <TreeView.Root
          value={selectedNodeId}
          onChange={(newParentFolderId) => {
            // don't allow parent folder to be itself
            if (newParentFolderId === id) return;

            setSelectedNodeId(newParentFolderId as CourseFolder["id"]);
          }}
        >
          {rootFolderIds.map((folderId) =>
            renderNode({
              folderId,
              materials: courseContent.materials,
              folders: courseContent.folders,
            })
          )}
        </TreeView.Root>

        <DialogFooter>
          <Button
            type="submit"
            disabled={mutation.isPending}
            onClick={handleMoveFolder}
          >
            {mutation.isPending ? (
              <>
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                Moving...
              </>
            ) : (
              "Move"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveFolderDialog;
