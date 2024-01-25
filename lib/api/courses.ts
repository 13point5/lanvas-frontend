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

    dummyChat: (payload: DummyChatPayload) => dummyChat(payload, axiosInstance),
  };
};
