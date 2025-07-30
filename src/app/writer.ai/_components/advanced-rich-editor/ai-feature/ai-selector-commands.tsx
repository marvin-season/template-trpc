import {
  ArrowDownWideNarrow,
  CheckCheck,
  GlassesIcon,
  Languages,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from "lucide-react";

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCurrentEditor } from "@tiptap/react";
import { AICommand, AICommandsType } from "@/types";

const basicOptions: AICommandsType[] = [
  {
    value: AICommand.improve,
    label: "Improve writing",
    icon: RefreshCcwDot,
  },

  {
    value: AICommand.fix,
    label: "Fix grammar",
    icon: CheckCheck,
  },
  {
    value: AICommand.shorter,
    label: "Make shorter",
    icon: ArrowDownWideNarrow,
  },
  {
    value: AICommand.longer,
    label: "Make longer",
    icon: WrapText,
  },
];

const advancedOptions: AICommandsType[] = [
  {
    value: AICommand.explain,
    label: "Explain",
    icon: GlassesIcon,
  },
  {
    value: AICommand.translate,
    label: "Translate",
    icon: Languages,
  },
  {
    value: AICommand.continue,
    label: "Continue",
    icon: StepForward,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, command: string) => void;
}
const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return;
  }
  return (
    <>
      <CommandGroup heading="Edit or review selection">
        <CommandList>
          {basicOptions.map((option) => (
            <CommandItem
              onSelect={(value) => {
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(
                  slice.content,
                );
                onSelect(text, value);
              }}
              className="flex gap-2 px-4"
              key={option.value}
              value={option.value as unknown as string}
            >
              <option.icon className="h-4 w-4 text-purple-500" />
              {option.label}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandList>
          {advancedOptions.map((option) => (
            <CommandItem
              onSelect={(value) => {
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(
                  slice.content,
                );
                onSelect(text, value);
              }}
              className="flex gap-2 px-4"
              key={option.value}
              value={option.value as unknown as string}
            >
              <option.icon className="h-4 w-4 text-purple-500" />
              {option.label}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
