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
  folderId: number;
  formData: FormData;
};

const uploadCourseMaterial = (
  payload: UploadCourseMaterialPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.post(
    `/courses/${payload.courseId}/folder/${payload.folderId}/upload`,
    payload.formData
  );

type RenameCourseMaterialPayload = {
  courseId: number;
  id: number;
  name: string;
};

const renameCourseMaterial = (
  payload: RenameCourseMaterialPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/material/${payload.id}`, {
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
  axiosInstance.patch(`/courses/${payload.courseId}/material/${payload.id}`, {
    folder_id: payload.folderId,
  });

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

type RenameCourseFolderPayload = {
  courseId: number;
  id: number;
  name: string;
};

const renameCourseFolder = (
  payload: RenameCourseFolderPayload,
  axiosInstance: AxiosInstance
) =>
  axiosInstance.patch(`/courses/${payload.courseId}/folder/${payload.id}`, {
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
  axiosInstance.patch(`/courses/${payload.courseId}/folder/${payload.id}`, {
    parent_id: payload.parentId,
  });

type DummyChatPayload = {
  courseId: number;
  body: {
    message: string;
  };
};

const dummyChat = (payload: DummyChatPayload, axiosInstance: AxiosInstance) =>
  axiosInstance.post(`/courses/${payload.courseId}/chat`, payload.body);

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
    renameCourseMaterial: (payload: RenameCourseMaterialPayload) =>
      renameCourseMaterial(payload, axiosInstance),
    moveCourseMaterial: (payload: MoveCourseMaterialPayload) =>
      moveCourseMaterial(payload, axiosInstance),

    createCourseFolder: (payload: CreateCourseFolderPayload) =>
      createCourseFolder(payload, axiosInstance),
    renameCourseFolder: (payload: RenameCourseMaterialPayload) =>
      renameCourseFolder(payload, axiosInstance),
    moveCourseFolder: (payload: MoveCourseFolderPayload) =>
      moveCourseFolder(payload, axiosInstance),

    dummyChat: (payload: DummyChatPayload) => dummyChat(payload, axiosInstance),
  };
};
