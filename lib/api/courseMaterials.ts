import { Database } from "@/app/supabase.types";
import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

export type CourseMaterial =
  Database["public"]["Tables"]["course_materials"]["Row"];

type GetCourseMaterialsPayload = {
  courseId: number;
};

const getCourseMaterials = (
  payload: GetCourseMaterialsPayload,
  axiosInstance: AxiosInstance
): Promise<CourseMaterial[]> =>
  axiosInstance
    .get(`/courses/${payload.courseId}/materials`)
    .then((res) => res.data);

type RenameCourseMaterialPayload = {
  courseId: number;
  id: number;
  name: string;
};

const renameCourseMaterial = (
  payload: RenameCourseMaterialPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/materials/${payload.id}`, {
    name: payload.name,
  });

type MoveCourseMaterialPayload = {
  courseId: number;
  id: number;
  folderId: number;
};

const moveCourseMaterial = (
  payload: MoveCourseMaterialPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/materials/${payload.id}`, {
    folder_id: payload.folderId,
  });

type UploadCourseMaterialPayload = {
  courseId: number;
  folderId: number;
  file: File;
};

const uploadCourseMaterial = (
  payload: UploadCourseMaterialPayload,
  axiosInstance: AxiosInstance
) => {
  const formData = new FormData();
  formData.append("uploadFile", payload.file);
  formData.append("folder_id", `${payload.folderId}`);

  return axiosInstance.post(
    `/courses/${payload.courseId}/materials/upload`,
    formData
  );
};

export const useCourseMaterialsApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseMaterials: (payload: GetCourseMaterialsPayload) =>
      getCourseMaterials(payload, axiosInstance),
    renameCourseMaterial: (payload: RenameCourseMaterialPayload) =>
      renameCourseMaterial(payload, axiosInstance),
    moveCourseMaterial: (payload: MoveCourseMaterialPayload) =>
      moveCourseMaterial(payload, axiosInstance),
    uploadCourseMaterial: (payload: UploadCourseMaterialPayload) =>
      uploadCourseMaterial(payload, axiosInstance),
  };
};
