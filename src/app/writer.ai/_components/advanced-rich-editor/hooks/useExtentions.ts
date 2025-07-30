import { AIHighlight } from "../extentions/highlight/ai-highlight";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

export default function useAdvancedExtentions() {
  return [
    TextStyle,
    Color,
    AIHighlight,
    Highlight.configure({ multicolor: true }),
  ];
}
