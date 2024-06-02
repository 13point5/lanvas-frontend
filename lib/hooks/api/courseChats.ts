import { CourseChat } from "@/app/types";
import { useCourseChatsApi } from "@/lib/api/courseChats";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCourseChatsKey = (id: number) => [...getCourseKey(id), "chats"];

export const useCourseChatsQuery = (courseId: number) => {
  const { getCourseChats } = useCourseChatsApi();

  return useQuery({
    queryKey: getCourseChatsKey(courseId),
    queryFn: () => getCourseChats({ courseId }),
  });
};

export const useCreateCourseChatMutation = () => {
  const { createCourseChat } = useCourseChatsApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourseChat,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseChat[]>(
        getCourseChatsKey(variables.courseId),
        (oldData = []) => {
          if (!oldData) return [data];

          return [...oldData, data];
        }
      );
    },
  });
};
