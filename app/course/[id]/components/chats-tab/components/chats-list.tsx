import { ChatItem } from "@/app/course/[id]/components/chats-tab/components/chat-item";
import { NewChatButton } from "@/app/course/[id]/components/chats-tab/components/new-chat-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCourseChatsQuery } from "@/lib/hooks/api/courseChats";
import { Loader2Icon } from "lucide-react";

type Props = {
  courseId: number;
};

const ChatsList = ({ courseId }: Props) => {
  const chatsQuery = useCourseChatsQuery(courseId);

  console.log("chatsQuery.data", chatsQuery.data);

  return (
    <div
      className="w-[260px] overflow-auto rounded-md bg-slate-50 flex flex-col gap-4 p-2"
      style={{
        height: "calc(100vh - 96px - 64px)",
      }}
    >
      <NewChatButton courseId={courseId} />

      <Separator />

      {chatsQuery.isPending && (
        <div className="flex gap-2 items-center">
          <Loader2Icon className="animate-spin" size={8} />
          <span className="text-sm">Fetching Chats</span>
        </div>
      )}

      {chatsQuery.data && (
        <div className="flex flex-col">
          {chatsQuery.data.map((item) => (
            <ChatItem key={item.id} name={item.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsList;
