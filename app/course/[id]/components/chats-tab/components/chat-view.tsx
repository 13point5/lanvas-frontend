import { Role, Message } from "@/app/types";
import { ChatMessage } from "@/components/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCoursesApi } from "@/lib/api/courses";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";

const messages: Message[] = [
  {
    id: "a0b1c2d3-e4f5-6g7h-8i9j-a1b2c3d4e5f6",
    content: "Hi, how may I help you?",
    role: Role.assistant,
  },
  {
    id: "235f47fe-734c-4654-837d-c0cbd8fe2efb",
    content: "any courses on education?",
    role: Role.human,
  },
];

const genMessages = (count: number) => {
  const messages: Message[] = [];

  // Alternate between human and assistant roles
  for (let i = 0; i < count; i++) {
    messages.push({
      id: `message-${i}`,
      content: `Message ${i} lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      role: i % 2 === 0 ? Role.human : Role.assistant,
    });
  }

  return messages;
};

const ChatView = () => {
  const isLoading = false;
  const messages = genMessages(20);

  const { dummyChat } = useCoursesApi();

  const [input, setInput] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex flex-col gap-0 p-2 h-full max-h-[calc(100vh - 96px)] overflow-hidden"
      style={{
        maxHeight: "calc(100vh - 96px - 64px)",
        overflow: "hidden",
      }}
    >
      <div className="overflow-auto w-full h-full max-h-full flex-1">
        {messages.map(
          (message, index) =>
            message.role !== Role.system && (
              <div key={message.id}>
                <ChatMessage message={message} />

                {index < messages.length - 1 && <Separator className="my-4" />}
              </div>
            )
        )}
      </div>

      <form className="flex gap-4 w-full" onSubmit={handleSubmit}>
        <Input
          className="flex-1"
          placeholder="type your message here"
          value={input}
          onChange={handleInputChange}
        />

        <Button type="submit" size="icon" disabled={isLoading}>
          {isLoading ? (
            <Loader2Icon className="w-4 h-4 animate-spin" />
          ) : (
            <SendIcon className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatView;
