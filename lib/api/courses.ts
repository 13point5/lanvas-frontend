import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type CreateCoursePayload = {
  title: string;
};

const createCourse = (
  payload: CreateCoursePayload,
  axiosInstance: AxiosInstance
) => axiosInstance.post("/courses", payload);

type GetCoursePayload = {
  id: number;
};

const getCourse = (payload: GetCoursePayload, axiosInstance: AxiosInstance) =>
  axiosInstance.get(`/courses/${payload.id}`);

type AddCourseMembersPayload = {
  courseId: number;
  members: Array<{ email: string; role: string }>;
};

const addCourseMembers = (
  payload: AddCourseMembersPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.post(`/courses/${payload.courseId}/members`, {
    members: payload.members,
  });

type UploadCourseMaterialPayload = {
  courseId: number;
  formData: FormData;
};

const uploadCourseMaterial = (
  payload: UploadCourseMaterialPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.post(`/courses/${payload.courseId}/upload`, payload.formData);

type CreateCourseFolderPayload = {
  courseId: number;
  name: string;
  parentFolderId: number | null;
};

const createCourseFolder = (
  payload: CreateCourseFolderPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.post(`/courses/${payload.courseId}/folder`, {
    name: payload.name,
    parentId: payload.parentFolderId,
  });

type UpdateCourseFolderPayload = {
  courseId: number;
  id: number;
  name: string;
};

const updateCourseFolder = (
  payload: UpdateCourseFolderPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/folder/${payload.id}`, {
    name: payload.name,
  });

export const useCoursesApi = () => {
  const { axiosInstance } = useAxios();

  return {
    createCourse: (payload: CreateCoursePayload) =>
      createCourse(payload, axiosInstance),
    getCourse: (payload: GetCoursePayload) => getCourse(payload, axiosInstance),

    addCourseMembers: (payload: AddCourseMembersPayload) =>
      addCourseMembers(payload, axiosInstance),

    uploadCourseMaterial: (payload: UploadCourseMaterialPayload) =>
      uploadCourseMaterial(payload, axiosInstance),

    createCourseFolder: (payload: CreateCourseFolderPayload) =>
      createCourseFolder(payload, axiosInstance),
    updateCourseFolder: (payload: UpdateCourseFolderPayload) =>
      updateCourseFolder(payload, axiosInstance),
  };
};
