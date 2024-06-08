import { CourseChatTopic, CourseId } from "@/app/types";
import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";

type GetCourseChatTopicsPayload = {
  courseId: CourseId;
};

const getCourseChatTopics = (
  payload: GetCourseChatTopicsPayload,
  axiosInstance: AxiosInstance
): Promise<CourseChatTopic[]> =>
  axiosInstance
    .get(`/courses/${payload.courseId}/analytics/topics`)
    .then((res) => res.data);

export const useCourseAnalyticsApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getCourseChatTopics: (payload: GetCourseChatTopicsPayload) =>
      getCourseChatTopics(payload, axiosInstance),
  };
};
