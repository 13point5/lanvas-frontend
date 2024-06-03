import { CurrentChatId } from "@/app/course/[id]/components/chats-tab";
import { Role, Message, CourseId } from "@/app/types";
import { ChatMessage } from "@/components/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useCourseChatMessageMutation,
  useCourseChatMessagesQuery,
} from "@/lib/hooks/api/courseChatMessages";
import { useCreateCourseChatMutation } from "@/lib/hooks/api/courseChats";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";

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

type Props = {
  courseId: CourseId;
  chatId: CurrentChatId;
  setCurrentChatId: (newChatId: CurrentChatId) => void;
};

const ChatView = ({ courseId, chatId, setCurrentChatId }: Props) => {
  const isLoading = false;
  // const messages = genMessages(0);
  console.log("chatId", chatId);
  const messagesQuery = useCourseChatMessagesQuery({ courseId, chatId });
  console.log("messagesQuery.data", messagesQuery.data);

  const courseChatMutation = useCreateCourseChatMutation();

  const chatMutation = useCourseChatMessageMutation();
  console.log("chatMutation.variables", chatMutation.variables);
  console.log("chatMutation.data", chatMutation.data);

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const chatTitle = input.slice(0, 30);
    const chat = await courseChatMutation.mutateAsync({
      courseId,
      title: chatTitle,
    });
    console.log("chat", chat);

    setCurrentChatId(chat.id);

    chatMutation.mutate({ message: input, courseId, chatId: chat.id });
  };

  return (
    <div
      className="flex flex-1 flex-col gap-2 p-2 overflow-hidden"
      style={{
        height: "calc(100vh - 96px - 64px)",
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

        {chatMutation.isPending && (
          <ChatMessage
            message={{
              id: "temp",
              content: chatMutation.variables.message,
              role: Role.human,
            }}
          />
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
