import { CourseFolder } from "@/lib/api/courseFolders";

type FolderIdsByParentId = Map<CourseFolder["parent_id"], CourseFolder["id"][]>;

type FoldersNormalised = {
  byId: Map<CourseFolder["id"], CourseFolder>;
  idsByParentId: FolderIdsByParentId;
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
  return childrenFolderIds.map((id) => normalisedFolders.byId.get(id)!);
};
