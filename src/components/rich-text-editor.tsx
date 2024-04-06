"use client";

import { cn } from "@/lib/utils";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((res) => res.Editor),
  {
    ssr: false,
  }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const RichTextEditor = ({
  value,
  onChange,
  disabled,
}: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const initialEditorState = value
      ? EditorState.createWithContent(convertFromRaw(markdownToDraft(value)))
      : EditorState.createEmpty();

    setEditorState(initialEditorState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const markdown = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    onChange(markdown);
  };

  return (
    <Editor
      editorClassName={cn(
        "border bg-secondary hover:bg-accent rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:ring-2 focus-within:ring-primary",
        disabled && "pointer-events-none opacity-50"
      )}
      wrapperClassName="placeholder:text-xl"
      toolbarClassName="bg-red-500 text-blue-500"
      toolbarStyle={{
        backgroundColor: "hsl(0, 0%, 20%)",
        border: "1px solid hsl(0 0% 27%)",
      }}
      placeholder="Add a description"
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  );
};
