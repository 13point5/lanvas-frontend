import { CourseChat } from "@/app/types";
import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseChatsPayload = {
  courseId: number;
};

const getCourseChats = (
  payload: GetCourseChatsPayload,
  axiosInstance: AxiosInstance
): Promise<CourseChat[]> =>
  axiosInstance
    .get(`/courses/${payload.courseId}/chats`)
    .then((res) => res.data);

type CreateCourseChatPayload = {
  courseId: number;
  title: string;
};

const createCourseChat = (
  payload: CreateCourseChatPayload,
  axiosInstance: AxiosInstance
): Promise<CourseChat> =>
  axiosInstance
    .post(`/courses/${payload.courseId}/chats`, {
      title: payload.title,
    })
    .then((res) => res.data);

export const useCourseChatsApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseChats: (payload: GetCourseChatsPayload) =>
      getCourseChats(payload, axiosInstance),
    createCourseChat: (payload: CreateCourseChatPayload) =>
      createCourseChat(payload, axiosInstance),
  };
};
