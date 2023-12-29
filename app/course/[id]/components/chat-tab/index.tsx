import { Role, Message } from "@/app/types";
import { ChatMessage } from "@/components/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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

const ChatTab = () => {
  const isLoading = false;

  const [input, setInput] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full w-full flex flex-col gap-0 overflow-hidden p-2">
      <div className="grow overflow-auto w-full h-full">
        {messages.map(
          (message, index) =>
            message.role !== Role.system && (
              <div key={message.id}>
                <ChatMessage message={message} />

                {index < messages.length - 1 && (
                  <Separator className="my-4 md:my-8" />
                )}
              </div>
            )
        )}
      </div>

      <form className="flex gap-4 w-full" onSubmit={handleSubmit}>
        <Input
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

export default ChatTab;
