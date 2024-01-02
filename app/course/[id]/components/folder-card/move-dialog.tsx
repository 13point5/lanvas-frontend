"use client";

import { CourseFolder, FormStatus } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useCoursesApi } from "@/lib/api/courses";
import { FoldersAndMaterialsTree } from "@/app/course/[id]/components/materials-tab";
import * as TreeView from "@/components/tree-view";

const renderNode = (dataTree: FoldersAndMaterialsTree, folderId: number) => {
  const folder = dataTree.foldersById.get(folderId);
  if (!folder) {
    return null;
  }

  console.log("folder", folder);

  return (
    <TreeView.Node
      key={folderId}
      node={{
        id: folderId,
        label: folder.name,
      }}
    >
      {folder.folders.map((folderId) => renderNode(dataTree, folderId))}
      {folder.materials.map((materialId) => (
        <div key={materialId} className="flex items-center gap-2 px-1">
          <div className="w-4 h-4" />
          <FileIcon size={16} />
          <p className="">{dataTree.materialsById.get(materialId)?.name}</p>
        </div>
      ))}
    </TreeView.Node>
  );
};

type Props = {
  courseId: number;
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataTree: FoldersAndMaterialsTree;
  onSuccess: (folder: CourseFolder) => void;
};

const MoveFolderDialog = ({
  id,
  courseId,
  open,
  onOpenChange,
  dataTree,
  onSuccess,
}: Props) => {
  console.log("dataTree", dataTree);

  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(
    null
  );

  const { moveCourseFolder } = useCoursesApi();

  const handleMoveFolder = async () => {
    if (formStatus === FormStatus.Loading) {
      return;
    }

    if (selectedNodeId === null) {
      return;
    }

    setFormStatus(FormStatus.Loading);

    try {
      const res = await moveCourseFolder({
        courseId,
        id,
        parentId: selectedNodeId as number,
      });
      onSuccess(res.data);

      setFormStatus(FormStatus.Success);
    } catch (error) {
      setFormStatus(FormStatus.Error);
    }
  };

  useEffect(() => {
    if (!open) {
      setFormStatus(FormStatus.Idle);
    }
  }, [open]);

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

            setSelectedNodeId(newParentFolderId);
          }}
        >
          {dataTree.rootFolders.map((folderId) =>
            renderNode(dataTree, folderId)
          )}
        </TreeView.Root>

        <DialogFooter>
          <Button
            type="submit"
            disabled={formStatus === FormStatus.Loading}
            onClick={handleMoveFolder}
          >
            {formStatus === FormStatus.Loading ? (
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
