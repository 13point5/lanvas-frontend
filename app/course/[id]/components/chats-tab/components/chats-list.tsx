import { CurrentChatId } from "@/app/course/[id]/components/chats-tab";
import { ChatItem } from "@/app/course/[id]/components/chats-tab/components/chat-item";
import { NewChatButton } from "@/app/course/[id]/components/chats-tab/components/new-chat-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCourseChatsQuery } from "@/lib/hooks/api/courseChats";
import { Loader2Icon } from "lucide-react";

type Props = {
  courseId: number;
  currentChatId: CurrentChatId;
  setCurrentChatId: (newChatId: CurrentChatId) => void;
};

const ChatsList = ({ courseId, currentChatId, setCurrentChatId }: Props) => {
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

      {chatsQuery.isPending && (
        <div className="flex gap-2 items-center">
          <Loader2Icon className="animate-spin" size={8} />
          <span className="text-sm">Fetching Chats</span>
        </div>
      )}

      {chatsQuery.data && chatsQuery.data.length > 0 && (
        <>
          <Separator />

          <div className="flex flex-col gap-2">
            {chatsQuery.data.map((item) => (
              <ChatItem
                key={item.id}
                name={item.title}
                active={item.id === currentChatId}
                onClick={() => setCurrentChatId(item.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatsList;
