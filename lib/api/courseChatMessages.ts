import { CourseChat, CourseChatMessage, CourseId } from "@/app/types";
import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseChatMessagesPayload = {
  courseId: CourseId;
  chatId: CourseChat["id"] | null;
};

const getCourseChatMessages = (
  payload: GetCourseChatMessagesPayload,
  axiosInstance: AxiosInstance
): Promise<CourseChatMessage[]> => {
  if (payload.chatId === null) {
    return Promise.resolve([]);
  }

  return axiosInstance
    .get(`/courses/${payload.courseId}/chats/${payload.chatId}/messages`)
    .then((res) => res.data);
};

export const useCourseChatMessagesApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseChatMessages: (payload: GetCourseChatMessagesPayload) =>
      getCourseChatMessages(payload, axiosInstance),
  };
};
