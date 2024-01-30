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

const renderNode = ({
  folderId,
  folders,
  materials,
}: {
  folderId: CourseFolder["parent_id"];
  folders: FoldersNormalised;
  materials: MaterialsNormalised;
}) => {
  const folder = folderId
    ? folders.byId.get(folderId)
    : {
        id: "home",
        name: "Home",
      };

  if (!folder) {
    return null;
  }

  const childrenFolderIds = folders.idsByParentId.get(folderId) || [];
  const childrenMaterialIds = materials.idsByFolderId.get(folderId) || [];

  return (
    <TreeView.Node
      key={folderId}
      id={folder.id}
      label={folder.name}
      alwaysOpen={folderId === null}
    >
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
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMove: (destinationFolderId: CourseFolder["parent_id"]) => void;
  loading: boolean;
};

const MoveCourseContentDialog = ({
  title,
  open,
  onOpenChange,
  onMove,
  loading,
}: Props) => {
  const [selectedNodeId, setSelectedNodeId] = useState<
    CourseFolder["id"] | "home"
  >("home");

  const courseContent = useContext(CourseContentContext);

  const handleMoveFolder = async () => {
    onMove(selectedNodeId === "home" ? null : selectedNodeId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <TreeView.Root
          value={selectedNodeId}
          onChange={(newParentFolderId) => {
            setSelectedNodeId(newParentFolderId as CourseFolder["id"]);
          }}
        >
          {renderNode({
            folderId: null,
            materials: courseContent.materials,
            folders: courseContent.folders,
          })}
        </TreeView.Root>

        <DialogFooter>
          <Button type="submit" disabled={loading} onClick={handleMoveFolder}>
            {loading ? (
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

export default MoveCourseContentDialog;
