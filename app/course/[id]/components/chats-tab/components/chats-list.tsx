import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

const ChatsList = () => {
  return (
    <div
      className="w-[260px] overflow-auto rounded-md bg-slate-50 flex flex-col gap-4 p-2"
      style={{
        height: "calc(100vh - 96px - 64px)",
      }}
    >
      <NewChatButton />

      <Separator />

      <div className="flex flex-col">
        <ChatItem name="Chat 1" />
        <ChatItem name="Chat 2" />
        <ChatItem name="Chat 3" />
      </div>
    </div>
  );
};

export default ChatsList;

const NewChatButton = () => {
  return (
    <Button variant="ghost" className="w-full justify-start">
      <PlusIcon className="mr-2 w-4 h-4" /> New Chat
    </Button>
  );
};

const ChatItem = ({ name }: { name: string }) => {
  return (
    <Button variant="ghost" className="w-full justify-start">
      {name}
    </Button>
  );
};
