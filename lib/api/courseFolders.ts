import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseFoldersPayload = {
  courseId: number;
};

const getCourseFolders = (
  payload: GetCourseFoldersPayload,
  axiosInstance: AxiosInstance
) => axiosInstance.get(`/courses/${payload.courseId}/folders`);

export const useCourseFoldersApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseFolders: (payload: GetCourseFoldersPayload) =>
      getCourseFolders(payload, axiosInstance),
  };
};
