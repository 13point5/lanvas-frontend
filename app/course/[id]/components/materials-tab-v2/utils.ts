import { CourseFolder } from "@/lib/api/courseFolders";
import { CourseMaterial } from "@/lib/api/courseMaterials";

export type FoldersNormalised = {
  byId: Map<CourseFolder["id"], CourseFolder>;
  idsByParentId: Map<CourseFolder["parent_id"], CourseFolder["id"][]>;
};

export const getFoldersNormalised = (
  folders: CourseFolder[]
): FoldersNormalised => {
  const state: FoldersNormalised = {
    byId: new Map(),
    idsByParentId: new Map(),
  };

  folders.forEach((folder) => {
    state.byId.set(folder.id, folder);

    const parentFolderId = folder.parent_id;

    if (!state.idsByParentId.has(parentFolderId)) {
      state.idsByParentId.set(parentFolderId, []);
    }

    state.idsByParentId.get(parentFolderId)?.push(folder.id);
  });

  return state;
};

export const getChildrenFolders = (
  normalisedFolders: FoldersNormalised,
  parentFolderId: CourseFolder["parent_id"]
): CourseFolder[] => {
  const childrenFolderIds =
    normalisedFolders.idsByParentId.get(parentFolderId) || [];

  const result: CourseFolder[] = [];

  childrenFolderIds.forEach((id) => {
    const folder = normalisedFolders.byId.get(id);
    if (!folder) return;

    result.push(folder);
  });

  return result;
};

export type MaterialsNormalised = {
  byId: Map<CourseMaterial["id"], CourseMaterial>;
  idsByFolderId: Map<CourseMaterial["folder_id"], CourseMaterial["id"][]>;
};

export const getMaterialsNormalised = (
  materials: CourseMaterial[]
): MaterialsNormalised => {
  const state: MaterialsNormalised = {
    byId: new Map(),
    idsByFolderId: new Map(),
  };

  materials.forEach((material) => {
    state.byId.set(material.id, material);

    const folderId = material.folder_id;

    if (!state.idsByFolderId.has(folderId)) {
      state.idsByFolderId.set(folderId, []);
    }

    state.idsByFolderId.get(folderId)?.push(material.id);
  });

  return state;
};

export const getFolderMaterials = (
  normalisedMaterials: MaterialsNormalised,
  folderId: CourseMaterial["folder_id"]
): CourseMaterial[] => {
  const materialIds = normalisedMaterials.idsByFolderId.get(folderId) || [];

  const result: CourseMaterial[] = [];

  materialIds.forEach((id) => {
    const material = normalisedMaterials.byId.get(id);
    if (!material) return;

    result.push(material);
  });

  return result;
};
