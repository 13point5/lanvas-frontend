import ChatView from "@/app/course/[id]/components/chats-tab/components/chat-view";
import ChatsList from "@/app/course/[id]/components/chats-tab/components/chats-list";
import { CourseChat } from "@/app/types";
import { useCourseChatsQuery } from "@/lib/hooks/api/courseChats";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

export type CurrentChatId = CourseChat["id"] | null;

type Props = {
  courseId: number;
};

const ChatsTab = ({ courseId }: Props) => {
  const chatsQuery = useCourseChatsQuery(courseId);

  const [currentChatId, setCurrentChatId] = useState<CurrentChatId>(null);

  if (chatsQuery.isPending) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <Loader2Icon className="animate-spin" size={24} />
          <span className="text-lg">Fetching Chats</span>
        </div>
      </div>
    );
  }

  if (chatsQuery.isError) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 items-center justify-center rounded-md bg-red-100 p-2">
          <AlertCircleIcon size={24} className="text-red-500" />
          <span className="text-lg text-red-500">Error Fetching Chats</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex gap-4">
      <ChatsList
        courseId={courseId}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
      <ChatView
        courseId={courseId}
        chatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
    </div>
  );
};

export default ChatsTab;
