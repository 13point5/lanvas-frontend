import ChatView from "@/app/course/[id]/components/chats-tab/components/chat-view";
import ChatsList from "@/app/course/[id]/components/chats-tab/components/chats-list";

type Props = {
  courseId: number;
};

const ChatsTab = ({ courseId }: Props) => {
  return (
    <div className="h-full flex gap-4">
      <ChatsList />
      <ChatView />
    </div>
  );
};

export default ChatsTab;
