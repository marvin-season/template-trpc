import { useCurrentEditor } from "@tiptap/react";
import { memo, useEffect } from "react";
import { useDebounce } from "ahooks";

export default memo(
  function AutoSave() {
    console.log("AutoSave");
    const { editor } = useCurrentEditor();

    const handleUpdate = useDebounce(() => {
      const markdown = editor?.storage.markdown.getMarkdown();
      console.log(markdown);
    }, {});

    useEffect(() => {
      if (!editor) return;

      editor.on("update", handleUpdate);
      return () => {
        editor.off("update", handleUpdate);
      };
    }, []);

    return <></>;
  },
  () => true,
);
