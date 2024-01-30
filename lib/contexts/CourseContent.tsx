import {
  FoldersNormalised,
  MaterialsNormalised,
} from "@/app/course/[id]/components/materials-tab-v2/utils";
import { createContext } from "react";

type CourseContentContextType = {
  folders: FoldersNormalised;
  materials: MaterialsNormalised;
};

export const CourseContentContext = createContext<CourseContentContextType>({
  folders: {
    byId: new Map(),
    idsByParentId: new Map(),
  },
  materials: {
    byId: new Map(),
    idsByFolderId: new Map(),
  },
});
