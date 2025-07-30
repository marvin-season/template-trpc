"use client";

import { Command, CommandInput } from "@/components/ui/command";

import { ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CrazySpinner, Magic } from "@/components/ui/icon";
import { useCurrentEditor } from "@tiptap/react";
import AICompletionCommands from "./ai-completion-command";
import AISelectorCommands from "./ai-selector-commands";
import { useCompletion } from "ai/react";
import AiCompleteResultPanel from "@/components/advanced-rich-editor/ai-feature/ai-completion-result-panel";
import useCompletionFetch from "@/utils/completion-fetch";

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return;
  }
  const [inputValue, setInputValue] = useState("");
  const { completionFetch } = useCompletionFetch()
  const { completion, complete, isLoading, setCompletion } = useCompletion({
    fetch: completionFetch,
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const hasCompletion = useMemo(() => completion.length > 0, [completion]);

  return (
    <Command className="w-[350px]">
      {hasCompletion && <AiCompleteResultPanel content={completion} />}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
          <Magic className="mr-2 h-4 w-4 shrink-0  " />
          AI is thinking
          <div className="ml-2 mt-1">
            <CrazySpinner />
          </div>
        </div>
      )}
      <div className="relative">
        <CommandInput
          value={inputValue}
          onValueChange={setInputValue}
          autoFocus
          placeholder={
            hasCompletion
              ? "Tell AI what to do next"
              : "Ask AI to edit or generate..."
          }
          onFocus={() => {
            editor.chain().setAIHighlight({ color: "#b072ca6f" }).run();
          }}
        />
        <Button
          size="icon"
          className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
          onClick={() => {
            const slice = editor.state.selection.content();
            const text = editor.storage.markdown.serializer.serialize(
              slice.content,
            );

            complete(inputValue, {
              body: { command: "zap", context: text },
            }).then(() => setInputValue(""));
          }}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
      {hasCompletion ? (
        <AICompletionCommands
          onSelect={() => {
            setCompletion("");
            onOpenChange(false);
          }}
          completion={completion}
        />
      ) : (
        <>
          <AISelectorCommands
            onSelect={(value, command) =>
              complete(value, { body: { command } })
            }
          />
        </>
      )}
    </Command>
  );
}
