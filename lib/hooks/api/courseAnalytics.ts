import { CourseId } from "@/app/types";
import { useCourseAnalyticsApi } from "@/lib/api/courseAnalytics";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useQuery } from "@tanstack/react-query";

const getCourseAnalyticsKey = (id: number) => [...getCourseKey(id), "chats"];

export const useCourseChatTopicsQuery = (courseId: CourseId) => {
  const { getCourseChatTopics } = useCourseAnalyticsApi();

  return useQuery({
    queryKey: [...getCourseAnalyticsKey(courseId), "topics"],
    queryFn: () => getCourseChatTopics({ courseId }),
  });
};

export const useCourseChatMisconceptionsQuery = (courseId: CourseId) => {
  const { getCourseChatMisconceptions } = useCourseAnalyticsApi();

  return useQuery({
    queryKey: [...getCourseAnalyticsKey(courseId), "misconceptions"],
    queryFn: () => getCourseChatMisconceptions({ courseId }),
  });
};
