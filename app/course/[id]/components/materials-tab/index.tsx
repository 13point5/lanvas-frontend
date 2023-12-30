"use client";

import FolderCard from "@/app/course/[id]/components/folder-card";
import { NewFolderButton } from "@/app/course/[id]/components/materials-tab/new-folder-button";
import UploadDialog from "@/app/course/[id]/components/materials-tab/upload-dialog";
import { CourseFolder, CourseMaterial, FormStatus } from "@/app/types";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCoursesApi } from "@/lib/api/courses";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { ColumnDef } from "@tanstack/react-table";
import { FolderPlusIcon, PlusIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

const getStatusLabel = (status: string) => {
  switch (status) {
    case "uploading":
      return "Uploading";
    case "processing":
      return "Processing";
    case "ready":
      return "Ready";
    default:
      return "Unknown";
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "uploading":
      return "bg-yellow-100 hover:bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "ready":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getFileTypeClass = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return "bg-red-100 text-red-500";
    case "doc":
      return "bg-blue-100 text-blue-500";
    case "txt":
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const columns: ColumnDef<CourseMaterial>[] = [
  {
    header: "Type",
    accessorKey: "type",
    cell: ({ row }) => {
      const name: string = row.getValue("file_name");
      const splits = name.split(".");
      const fileType = splits[splits.length - 1];

      return (
        <p
          className={`${getFileTypeClass(
            fileType
          )} bg-transparent hover:bg-transparent text-xs font-medium`}
        >
          {fileType.toUpperCase()}
        </p>
      );
    },
  },
  { header: "Name", accessorKey: "file_name" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <Badge className={`${getStatusClass(status)}`}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
  },
  { header: "Date Created", accessorKey: "created_at" },
];

type Props = {
  courseId: number;

  materials: CourseMaterial[];
  onAddMaterials: (data: CourseMaterial[]) => void;

  folders: CourseFolder[];
  onAddFolder: (data: CourseFolder) => void;
  onUpdateFolder: (data: CourseFolder) => void;
};

export default function MaterialsTab({
  courseId,
  materials,
  onAddMaterials,
  folders,
  onAddFolder,
  onUpdateFolder,
}: Props) {
  const uploadDialogState = useBoolean();
  const [uploadStatus, setUploadStatus] = useState<FormStatus>(FormStatus.Idle);

  const coursesApi = useCoursesApi();

  const handleUpload = async (files: File[]) => {
    console.log("files", files);

    if (uploadStatus === FormStatus.Loading) {
      return;
    }

    try {
      setUploadStatus(FormStatus.Loading);

      const res = await Promise.all(
        files.map((file) => {
          const formData = new FormData();
          formData.append("uploadFile", file);

          return coursesApi.uploadCourseMaterial({
            courseId,
            formData,
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
      <div className="flex gap-4 items-center">
        <Button
          variant="outline"
          className="w-fit"
          onClick={uploadDialogState.on}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Materials
        </Button>

        <NewFolderButton
          courseId={courseId}
          parentFolderId={null}
          onAddFolder={onAddFolder}
        />
      </div>

      <UploadDialog
        open={uploadDialogState.value}
        onOpenChange={uploadDialogState.setValue}
        loading={uploadStatus === FormStatus.Loading}
        onUpload={handleUpload}
      />

      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold tracking-tight">Folders</h4>

        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              courseId={courseId}
              name={folder.name}
              onUpdate={onUpdateFolder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
