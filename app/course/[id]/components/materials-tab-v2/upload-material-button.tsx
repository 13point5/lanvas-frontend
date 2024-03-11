"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2Icon, UploadCloudIcon, UploadIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as R from "ramda";
import { Label } from "@/components/ui/label";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { useUploadCourseMaterialMutation } from "@/lib/hooks/api/courseMaterials";

type Props = {
  courseId: number;
  folderId: number | null;
};

export default function UploadMaterialButton({ courseId, folderId }: Props) {
  const dialogState = useBoolean();

  const mutation = useUploadCourseMaterialMutation();
  const loading = mutation.isPending;

  const [files, setFiles] = useState<File[]>([]);

  const handleRemoveFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => R.uniqBy(R.prop("name"), [...prev, ...acceptedFiles]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    disabled: loading,
    multiple: false,
  });

  const handleUpload = async () => {
    if (files.length !== 1) return;

    const file = files[0];

    await mutation.mutate({
      courseId,
      folderId,
      file,
    });

    dialogState.off();
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-fit"
        size="sm"
        onClick={dialogState.on}
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Materials
      </Button>

      <Dialog open={dialogState.value} onOpenChange={dialogState.setValue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload materials</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 w-full max-w-full">
            <div
              className={`border rounded-md bg-white p-4 ${
                loading ? "cursor-no-drop" : "cursor-pointer"
              } flex flex-col gap-2 items-center shadow-none`}
              {...getRootProps()}
            >
              <input {...getInputProps()} disabled={loading} />

              <UploadCloudIcon className="h-8 w-8" />

              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  Drag &apos;n&apos; drop some files here or Click to select
                  files
                </p>
              )}
            </div>

            {files.length > 0 && <Label>Files</Label>}

            <div className="flex flex-col gap-2 max-h-[250px] overflow-auto">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex gap-4 items-center justify-between w-full border p-2 rounded-md"
                >
                  <p className="text-sm text-ellipsis">{file.name}</p>

                  <Button
                    onClick={() => handleRemoveFile(file.name)}
                    disabled={loading}
                    size="icon"
                    variant="ghost"
                    className="w-10 h-10"
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleUpload}
              variant="default"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
