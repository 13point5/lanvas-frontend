import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";
import { Course, CourseMemberRole } from "@/app/types";

export type UserCourse = {
  role: CourseMemberRole;
  course: Course;
};

type GetCoursePayload = {
  id: number;
};

const getUserCourse = (
  payload: GetCoursePayload,
  axiosInstance: AxiosInstance
): Promise<UserCourse> =>
  axiosInstance.get(`/courses/${payload.id}`).then((res) => res.data);

const getUserCourses = (axiosInstance: AxiosInstance): Promise<UserCourse[]> =>
  axiosInstance.get("/courses").then((res) => res.data);

type CreateCoursePayload = {
  title: string;
};

const createCourse = (
  payload: CreateCoursePayload,
  axiosInstance: AxiosInstance
) => axiosInstance.post("/courses", payload);

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
    getUserCourse: (payload: GetCoursePayload) =>
      getUserCourse(payload, axiosInstance),
    getUserCourses: () => getUserCourses(axiosInstance),

    dummyChat: (payload: DummyChatPayload) => dummyChat(payload, axiosInstance),
  };
};

// const getCourseFoldersKey = (id: number) => [...getCourseKey(id), "folders"];
