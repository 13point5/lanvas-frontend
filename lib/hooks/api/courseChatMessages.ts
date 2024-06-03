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

const chatMutationFn = async ({
  message,
  chatId,
}: {
  message: string;
  courseId: CourseId;
  chatId: CourseChat["id"];
}) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        message: {
          id: 0,
          chat_id: chatId,
          role: "human",
          content: message,
          created_at: new Date(),
          metadata: {},
        },
        response: {
          id: 1,
          chat_id: chatId,
          role: "assistant",
          content: "sup",
          created_at: new Date(),
          metadata: {},
        },
      });
    }, 2000)
  );
};

export const useCourseChatMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatMutationFn,

    onSuccess: (data, variables) => {
      console.log("data", data);
      console.log("variables", variables);
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
