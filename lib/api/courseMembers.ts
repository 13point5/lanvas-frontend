import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseMembersPayload = {
  courseId: number;
};

const getCourseMembers = (
  payload: GetCourseMembersPayload,
  axiosInstance: AxiosInstance
) => axiosInstance.get(`/courses/${payload.courseId}/members`);

export const useCourseMembersApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseMembers: (payload: GetCourseMembersPayload) =>
      getCourseMembers(payload, axiosInstance),
  };
};
