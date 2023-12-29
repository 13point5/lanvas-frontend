import { IconOpenAI } from "@/components/icons";
import { MemoizedReactMarkdown } from "@/components/markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, UserIcon, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message, Role } from "@/app/types";
import Link from "next/link";

type Props = {
  message: Message;
};

export const ChatMessage = ({ message }: Props) => {
  const { id, role, content } = message;

  return (
    <div className="group relative mb-4 flex items-start">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
          role === Role.human
            ? "bg-background"
            : "bg-primary text-primary-foreground",
          role !== Role.human && "border-[#10172A]"
        )}
      >
        {role === Role.human ? <UserIcon /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-4 overflow-hidden">
        <MemoizedReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
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
