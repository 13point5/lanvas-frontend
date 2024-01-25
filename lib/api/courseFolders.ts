import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseFoldersPayload = {
  courseId: number;
};

const getCourseFolders = (
  payload: GetCourseFoldersPayload,
  axiosInstance: AxiosInstance
) => axiosInstance.get(`/courses/${payload.courseId}/folders`);

type CreateCourseFolderPayload = {
  courseId: number;
  name: string;
  parentFolderId: number | null;
};

const createCourseFolder = (
  payload: CreateCourseFolderPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.post(`/courses/${payload.courseId}/folders`, {
    name: payload.name,
    parentId: payload.parentFolderId,
  });

type RenameCourseFolderPayload = {
  courseId: number;
  id: number;
  name: string;
};

const renameCourseFolder = (
  payload: RenameCourseFolderPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/folders/${payload.id}`, {
    name: payload.name,
  });

type MoveCourseFolderPayload = {
  courseId: number;
  id: number;
  parentId: number | null;
};

const moveCourseFolder = (
  payload: MoveCourseFolderPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/folders/${payload.id}`, {
    parent_id: payload.parentId,
  });

export const useCourseFoldersApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseFolders: (payload: GetCourseFoldersPayload) =>
      getCourseFolders(payload, axiosInstance),
    createCourseFolder: (payload: CreateCourseFolderPayload) =>
      createCourseFolder(payload, axiosInstance),
    renameCourseFolder: (payload: RenameCourseFolderPayload) =>
      renameCourseFolder(payload, axiosInstance),
    moveCourseFolder: (payload: MoveCourseFolderPayload) =>
      moveCourseFolder(payload, axiosInstance),
  };
};
