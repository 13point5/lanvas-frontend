import { IconOpenAI } from "@/components/icons";
import { MemoizedReactMarkdown } from "@/components/markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { CourseChatMessage } from "@/app/types";

type Props = {
  message: {
    role: string;
    content: string;
  };
};

export const ChatMessage = ({ message }: Props) => {
  const { role, content } = message;

  return (
    <div className="group relative mb-4 flex items-start">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
          role === "human"
            ? "bg-background"
            : "bg-primary text-primary-foreground",
          role !== "human" && "border-[#10172A]"
        )}
      >
        {role === "human" ? <UserIcon /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-4 overflow-hidden">
        <MemoizedReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          className="prose break-words max-w-full"
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
};
