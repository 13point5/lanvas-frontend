import { Database } from "@/app/supabase.types";
import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

export type CourseFolder =
  Database["public"]["Tables"]["course_folders"]["Row"];

type GetCourseFoldersPayload = {
  courseId: number;
};

const getCourseFolders = (
  payload: GetCourseFoldersPayload,
  axiosInstance: AxiosInstance
): Promise<CourseFolder[]> =>
  axiosInstance
    .get(`/courses/${payload.courseId}/folders`)
    .then((res) => res.data);

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
    parent_id: payload.parentFolderId,
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

type DeleteCourseFolderPayload = {
  courseId: number;
  id: number;
};

const deleteCourseFolder = (
  payload: DeleteCourseFolderPayload,
  axiosInstance: AxiosInstance
) => axiosInstance.delete(`/courses/${payload.courseId}/folders/${payload.id}`);

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
    deleteCourseFolder: (payload: DeleteCourseFolderPayload) =>
      deleteCourseFolder(payload, axiosInstance),
  };
};
