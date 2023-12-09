"use client";

import { EditorContent, BubbleMenu, Editor } from "@tiptap/react";

import { Bold, Code, Italic, List } from "lucide-react";

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="space-x-1"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded-md text-white ${
              editor.isActive("bold") ? "bg-black " : "bg-gray-500"
            }`}
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`text-white rounded-md p-1 ${
              editor.isActive("italic") ? "bg-black " : "bg-gray-500"
            }`}
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1 rounded-lg text-white ${
              editor.isActive("codeBlock") ? "bg-black " : "bg-gray-500"
            }`}
          >
            <Code size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`text-white rounded-md p-1 ${
              editor.isActive("orderdList") ? "bg-black " : "bg-gray-500"
            }`}
          >
            <List size={20} />
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
