import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseMaterialsPayload = {
  courseId: number;
};

const getCourseMaterials = (
  payload: GetCourseMaterialsPayload,
  axiosInstance: AxiosInstance
) => axiosInstance.get(`/courses/${payload.courseId}/materials`);

export const useCourseMaterialsApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseMaterials: (payload: GetCourseMaterialsPayload) =>
      getCourseMaterials(payload, axiosInstance),
  };
};
