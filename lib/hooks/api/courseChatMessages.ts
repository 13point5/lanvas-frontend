import { CurrentChatId } from "@/app/course/[id]/components/chats-tab";
import { CourseChat, CourseChatMessage, CourseId } from "@/app/types";
import { useCourseChatMessagesApi } from "@/lib/api/courseChatMessages";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCourseChatMessagesKey = ({
  courseId,
  chatId,
}: {
  courseId: CourseId;
  chatId: CurrentChatId;
}) => [...getCourseKey(courseId), "chats", chatId, "messages"];

export const useCourseChatMessagesQuery = ({
  courseId,
  chatId,
}: {
  courseId: CourseId;
  chatId: CurrentChatId;
}) => {
  const { getCourseChatMessages } = useCourseChatMessagesApi();

  return useQuery({
    queryKey: getCourseChatMessagesKey({ courseId, chatId }),
    queryFn: () => getCourseChatMessages({ courseId, chatId }),
  });
};

export const useCourseChatMessageMutation = () => {
  const queryClient = useQueryClient();

  const { chat } = useCourseChatMessagesApi();

  return useMutation({
    mutationFn: chat,

    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseChatMessage[]>(
        getCourseChatMessagesKey({
          courseId: variables.courseId,
          chatId: variables.chatId,
        }),
        (oldData = []) => {
          if (!oldData) {
            return [data.message, data.response];
          }

          return [...oldData, data.message, data.response];
        }
      );
    },
  });
};
