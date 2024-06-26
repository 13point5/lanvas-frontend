import FolderCardV2 from "@/app/course/[id]/components/folder-card-v2";
import FileCardV2 from "@/app/course/[id]/components/file-card-v2";
import { NewFolderButton } from "@/app/course/[id]/components/materials-tab-v2/new-folder-button";
import {
  getChildrenFolders,
  getFolderMaterials,
  getFoldersNormalised,
  getMaterialsNormalised,
} from "@/app/course/[id]/components/materials-tab-v2/utils";
import FolderBreadcrumbs from "@/app/course/[id]/components/materials-tab-v2/folder-breadcrumbs";
import { useCourseFoldersQuery } from "@/lib/hooks/api/courseFolders";
import { useCourseMaterialsQuery } from "@/lib/hooks/api/courseMaterials";
import { useMemo, useState } from "react";
import { CourseContentContext } from "@/lib/contexts/CourseContent";
import UploadMaterialButton from "@/app/course/[id]/components/materials-tab-v2/upload-material-button";
import { AccessLevel, Course, CourseFolder } from "@/app/types";

type Props = {
  courseId: Course["id"];
  accessLevel: AccessLevel;
};

const MaterialsTabV2 = ({ courseId, accessLevel }: Props) => {
  const foldersQuery = useCourseFoldersQuery(courseId);
  const materialsQuery = useCourseMaterialsQuery(courseId);
  const [parentFolderBreadcrumbs, setParentFolderBreadcrumbs] = useState<
    CourseFolder["id"][]
  >([]);

  const currentParentFolderId =
    parentFolderBreadcrumbs.length === 0
      ? null
      : parentFolderBreadcrumbs[parentFolderBreadcrumbs.length - 1];

  const normalisedFolders = useMemo(
    () => getFoldersNormalised(foldersQuery.data || []),
    [foldersQuery.data]
  );

  const currentFolders = useMemo(
    () => getChildrenFolders(normalisedFolders, currentParentFolderId),
    [normalisedFolders, currentParentFolderId]
  );

  const normalisedMaterials = useMemo(
    () => getMaterialsNormalised(materialsQuery.data || []),
    [materialsQuery.data]
  );

  const currentMaterials = useMemo(
    () => getFolderMaterials(normalisedMaterials, currentParentFolderId),
    [normalisedMaterials, currentParentFolderId]
  );

  const handleFolderClick = (id: CourseFolder["id"]) => {
    setParentFolderBreadcrumbs((prev) => [...prev, id]);
  };

  const handleBreadcrumbItemClick = (id: CourseFolder["parent_id"]) => {
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

  return (
    <div className="flex flex-col gap-8 pb-4">
      <div className="flex flex-col gap-2">
        <FolderBreadcrumbs
          items={parentFolderBreadcrumbs.map((id) => ({
            id,
            name: normalisedFolders.byId.get(id)?.name || "",
          }))}
          onItemClick={handleBreadcrumbItemClick}
        />

        {accessLevel === AccessLevel.Edit && (
          <div className="flex gap-4 items-center">
            <UploadMaterialButton
              courseId={courseId}
              folderId={currentParentFolderId}
            />

            <NewFolderButton
              courseId={courseId}
              parentFolderId={currentParentFolderId}
            />
          </div>
        )}
      </div>

      <CourseContentContext.Provider
        value={{ folders: normalisedFolders, materials: normalisedMaterials }}
      >
        <>
          <div className="flex flex-col gap-2">
            <h5 className="text-md font-semibold tracking-tight">Folders</h5>

            {currentFolders.length === 0 && (
              <p className="text-sm text-muted-foreground">No Folders yet</p>
            )}

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {currentFolders.map((folder) => (
                <FolderCardV2
                  key={folder.id}
                  id={folder.id}
                  courseId={courseId}
                  name={folder.name}
                  onClick={handleFolderClick}
                  accessLevel={accessLevel}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="text-md font-semibold tracking-tight">Files</h5>

            {currentMaterials.length === 0 && (
              <p className="text-sm text-muted-foreground">No Files yet</p>
            )}

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {currentMaterials.map((material) => (
                <FileCardV2
                  key={material.id}
                  id={material.id}
                  courseId={courseId}
                  name={material.name}
                  accessLevel={accessLevel}
                />
              ))}
            </div>
          </div>
        </>
      </CourseContentContext.Provider>
    </div>
  );
};

export default MaterialsTabV2;
