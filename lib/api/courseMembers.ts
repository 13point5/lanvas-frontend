import { CourseMember } from "@/app/types";
import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseMembersPayload = {
  courseId: number;
};

const getCourseMembers = (
  payload: GetCourseMembersPayload,
  axiosInstance: AxiosInstance
): Promise<CourseMember[]> =>
  axiosInstance
    .get(`/courses/${payload.courseId}/members`)
    .then((res) => res.data);

type AddCourseMembersPayload = {
  courseId: number;
  members: Array<{ email: string; role: string }>;
};

const addCourseMembers = (
  payload: AddCourseMembersPayload,
  axiosInstance: AxiosInstance
): Promise<CourseMember[]> =>
  axiosInstance
    .post(`/courses/${payload.courseId}/members`, {
      members: payload.members,
    })
    .then((res) => res.data);

export const useCourseMembersApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseMembers: (payload: GetCourseMembersPayload) =>
      getCourseMembers(payload, axiosInstance),
    addCourseMembers: (payload: AddCourseMembersPayload) =>
      addCourseMembers(payload, axiosInstance),
  };
};
