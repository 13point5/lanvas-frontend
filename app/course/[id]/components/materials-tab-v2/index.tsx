import FolderCardV2 from "@/app/course/[id]/components/folder-card-v2";
import {
  getChildrenFolders,
  getFoldersNormalised,
} from "@/app/course/[id]/components/materials-tab-v2/utils";
import FolderBreadcrumbs from "@/app/course/[id]/components/materials-tab/folder-breadcrumbs";
import { Button } from "@/components/ui/button";
import { CourseFolder } from "@/lib/api/courseFolders";
import { useCourseFoldersQuery } from "@/lib/hooks/api/courseFolders";
import { useCourseMaterialsQuery } from "@/lib/hooks/api/courseMaterials";
import { LinkIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  courseId: number;
};

const MaterialsTabV2 = ({ courseId }: Props) => {
  const foldersQuery = useCourseFoldersQuery(courseId);
  const materialsQuery = useCourseMaterialsQuery(courseId);

  const [parentFolderBreadcrumbs, setParentFolderBreadcrumbs] = useState<
    CourseFolder["id"][]
  >([]);

  const currentParentFolderId =
    parentFolderBreadcrumbs.length === 0
      ? null
      : parentFolderBreadcrumbs[parentFolderBreadcrumbs.length - 1];

  const handleFolderClick = (id: number) => {
    setParentFolderBreadcrumbs((prev) => [...prev, id]);
  };

  const handleBreadcrumbItemClick = (id: number | null) => {
    setParentFolderBreadcrumbs((prev) =>
      id === null ? [] : prev.slice(0, prev.indexOf(id) + 1)
    );
  };

  if (foldersQuery.isPending || materialsQuery.isPending) {
    return <p>loading</p>;
  }

  if (foldersQuery.isError || materialsQuery.isError) {
    return <p>error</p>;
  }

  const normalisedFolders = getFoldersNormalised(foldersQuery.data);

  const currentFolders = getChildrenFolders(
    normalisedFolders,
    currentParentFolderId
  );

  console.log({ normalisedFolders, currentFolders });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <FolderBreadcrumbs
          items={parentFolderBreadcrumbs.map((id) => ({
            id,
            name: normalisedFolders.byId.get(id)?.name || "",
          }))}
          onItemClick={handleBreadcrumbItemClick}
        />

        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            className="w-fit"
            size="sm"
            // onClick={uploadDialogState.on}
          >
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload Materials
          </Button>

          {/* <NewFolderButton
            courseId={courseId}
            parentFolderId={activeFolderId}
            onAddFolder={onAddFolder}
          /> */}

          {/* <Button variant="outline" className="w-fit" size="sm">
            <LinkIcon className="mr-2 h-4 w-4" />
            Copy Chatbot Link
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-md font-semibold tracking-tight">Folders</h5>

        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {currentFolders.map((folder) => (
            <FolderCardV2
              key={folder.id}
              id={folder.id}
              courseId={courseId}
              name={folder.name}
              onClick={handleFolderClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialsTabV2;
