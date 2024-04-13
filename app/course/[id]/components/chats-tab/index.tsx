import ChatView from "@/app/course/[id]/components/chats-tab/components/chat-view";
import ChatsList from "@/app/course/[id]/components/chats-tab/components/chats-list";

type Props = {
  courseId: number;
};

const ChatsTab = ({ courseId }: Props) => {
  return (
    <div className="h-full max-h-[calc(100% - 96px)] flex gap-4">
      <ChatsList />
      <ChatView />
    </div>
  );
};

export default ChatsTab;
