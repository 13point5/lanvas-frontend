"use client";

import FileCard from "@/app/course/[id]/components/file-card";
import FolderCard from "@/app/course/[id]/components/folder-card";
import FolderBreadcrumbs from "@/app/course/[id]/components/materials-tab/folder-breadcrumbs";
import { NewFolderButton } from "@/app/course/[id]/components/materials-tab/new-folder-button";
import UploadDialog from "@/app/course/[id]/components/materials-tab/upload-dialog";
import { CourseFolder, CourseMaterial, FormStatus } from "@/app/types";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCourseMaterialsApi } from "@/lib/api/courseMaterials";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { ColumnDef } from "@tanstack/react-table";
import { FolderPlusIcon, LinkIcon, PlusIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

type FoldersById = CourseFolder & {
  folders: number[];
  materials: number[];
};

export type FoldersAndMaterialsTree = {
  foldersById: Map<number, FoldersById>;

  materialsById: Map<
    number,
    {
      id: number;
      name: string;
    }
  >;

  rootFolders: number[];
};

const getFolderAndMaterialsTree = (
  folders: CourseFolder[],
  materials: CourseMaterial[]
) => {
  const result: FoldersAndMaterialsTree = {
    foldersById: new Map(),
    materialsById: new Map(),
    rootFolders: [],
  };

  // create empty entries for all folders
  folders.forEach((folder) => {
    result.foldersById.set(folder.id, {
      ...folder,
      folders: [],
      materials: [],
    });
  });

  // create entries for all materials
  materials.forEach((material) => {
    result.materialsById.set(material.id, {
      id: material.id,
      name: material.name,
    });
  });

  // add child folders and root folders
  folders.forEach((folder) => {
    if (folder.parent_id === null) {
      result.rootFolders.push(folder.id);
      return;
    }

    const parentFolder = result.foldersById.get(folder.parent_id);
    if (!parentFolder) return;

    parentFolder.folders.push(folder.id);
  });

  // add materials to folders
  materials.forEach((material) => {
    if (material.folder_id === null) {
      return;
    }

    const parentFolder = result.foldersById.get(material.folder_id);
    if (!parentFolder) return;

    parentFolder.materials.push(material.id);
  });

  return result;
};

const data = {
  foldersById: {
    1: {
      name: "Folder 1",
      folders: [3, 4],
      materials: [1, 2],
    },
    2: {
      name: "Folder 2",
      folders: [],
      materials: [],
    },
    3: {
      name: "Folder 3",
      folders: [],
      materials: [],
    },
    4: {
      name: "Folder 4",
      folders: [],
      materials: [],
    },
  },
  materialsById: {
    1: {
      name: "Material 1",
      status: "ready",
    },
    2: {
      name: "Material 2",
      status: "processing",
    },
  },
  rootFolders: [1, 2],
};

type Props = {
  courseId: number;

  materials: CourseMaterial[];
  onAddMaterials: (data: CourseMaterial[]) => void;
  onUpdateMaterial: (data: CourseMaterial) => void;

  folders: CourseFolder[];
  onAddFolder: (data: CourseFolder) => void;
  onUpdateFolder: (data: CourseFolder) => void;
};

export default function MaterialsTab({
  courseId,

  materials,
  onAddMaterials,
  onUpdateMaterial,

  folders,
  onAddFolder,
  onUpdateFolder,
}: Props) {
  const uploadDialogState = useBoolean();
  const [uploadStatus, setUploadStatus] = useState<FormStatus>(FormStatus.Idle);

  const foldersAndMaterialsTree = getFolderAndMaterialsTree(folders, materials);

  const [folderPathIds, setFolderPathIds] = useState<number[]>([]);

  const activeFolderId =
    folderPathIds.length > 0 ? folderPathIds[folderPathIds.length - 1] : null;

  const childrenFolderIds = activeFolderId
    ? foldersAndMaterialsTree.foldersById.get(activeFolderId)?.folders || []
    : foldersAndMaterialsTree.rootFolders;

  const childrenFolders = childrenFolderIds
    .map((id) => foldersAndMaterialsTree.foldersById.get(id))
    .filter((folder): folder is FoldersById => folder !== undefined);

  const childrenMaterialIds = activeFolderId
    ? foldersAndMaterialsTree.foldersById.get(activeFolderId)?.materials || []
    : [];

  const childrenMaterials = childrenMaterialIds
    .map((id) => foldersAndMaterialsTree.materialsById.get(id))
    .filter(
      (material): material is { id: number; name: string } =>
        material !== undefined
    );

  const handleFolderClick = (id: number) => {
    setFolderPathIds((prev) => [...prev, id]);
  };

  const handleBreadcrumbItemClick = (id: number | null) => {
    setFolderPathIds((prev) =>
      id === null ? [] : prev.slice(0, prev.indexOf(id) + 1)
    );
  };

  const { uploadCourseMaterial } = useCourseMaterialsApi();

  const handleUpload = async (files: File[]) => {
    console.log("files", files);

    if (
      uploadStatus === FormStatus.Loading ||
      activeFolderId === null ||
      files.length === 0
    ) {
      return;
    }

    try {
      setUploadStatus(FormStatus.Loading);

      const res = await Promise.all(
        files.map((file) => {
          const formData = new FormData();
          formData.append("uploadFile", file);

          return uploadCourseMaterial({
            courseId,
            folderId: activeFolderId,
            file,
          });
        })
      );

      const newFiles = res.map((res) => res.data);
      onAddMaterials(newFiles);

      setUploadStatus(FormStatus.Success);
      uploadDialogState.off();
    } catch (error) {
      console.error(error);
      setUploadStatus(FormStatus.Error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <FolderBreadcrumbs
          items={folderPathIds.map((id) => ({
            id,
            name: foldersAndMaterialsTree.foldersById.get(id)?.name || "",
          }))}
          onItemClick={handleBreadcrumbItemClick}
        />

        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            className="w-fit"
            size="sm"
            onClick={uploadDialogState.on}
            disabled={activeFolderId === null}
          >
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload Materials
          </Button>
          <NewFolderButton
            courseId={courseId}
            parentFolderId={activeFolderId}
            onAddFolder={onAddFolder}
          />
          <Button variant="outline" className="w-fit" size="sm">
            <LinkIcon className="mr-2 h-4 w-4" />
            Copy Chatbot Link
          </Button>
        </div>
      </div>

      <UploadDialog
        open={uploadDialogState.value}
        onOpenChange={uploadDialogState.setValue}
        loading={uploadStatus === FormStatus.Loading}
        onUpload={handleUpload}
      />

      <div className="flex flex-col gap-2">
        <h5 className="text-md font-semibold tracking-tight">Folders</h5>

        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {childrenFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              courseId={courseId}
              name={folder.name}
              onUpdate={onUpdateFolder}
              onClick={handleFolderClick}
              dataTree={foldersAndMaterialsTree}
            />
          ))}
        </div>
      </div>

      {childrenMaterials.length > 0 && (
        <div className="flex flex-col gap-2">
          <h5 className="text-md font-semibold tracking-tight">Files</h5>

          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {childrenMaterials.map((material) => (
              <FileCard
                key={material.id}
                id={material.id}
                courseId={courseId}
                name={material.name}
                onUpdate={onUpdateMaterial}
                dataTree={foldersAndMaterialsTree}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
