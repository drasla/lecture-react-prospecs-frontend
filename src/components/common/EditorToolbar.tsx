import type { Editor } from "@tiptap/react";
import { twMerge } from "tailwind-merge";
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdImage,
} from "react-icons/md";

interface EditorToolbarProps {
    editor: Editor | null;
    onImageUpload: () => void;
}

function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
    if (!editor) return null;

    return (
        <div
            className={twMerge(
                ["border-b", "border-gray-200", "p-2"],
                ["flex", "gap-2", "bg-gray-50", "flex-wrap"],
            )}>
            <button
                type={"button"}
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={twMerge(
                    ["p-2", "rounded", "hover:bg-gray-200"],
                    ["transition-all"],
                    editor.isActive("bold") ? ["bg-gray-800", "text-white"] : "text-gray-500",
                )}>
                <MdFormatBold size={20} />
            </button>

            <button
                type={"button"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={twMerge(
                    ["p-2", "rounded", "hover:bg-gray-200"],
                    ["transition-all"],
                    editor.isActive("italic") ? ["bg-gray-800", "text-white"] : "text-gray-500",
                )}>
                <MdFormatItalic size={20} />
            </button>

            <button
                type={"button"}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={twMerge(
                    ["p-2", "rounded", "hover:bg-gray-200"],
                    ["transition-all"],
                    editor.isActive("orderedList")
                        ? ["bg-gray-800", "text-white"]
                        : "text-gray-500",
                )}>
                <MdFormatListNumbered size={20} />
            </button>

            <button
                type={"button"}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={twMerge(
                    ["p-2", "rounded", "hover:bg-gray-200"],
                    ["transition-all"],
                    editor.isActive("bulletList") ? ["bg-gray-800", "text-white"] : "text-gray-500",
                )}>
                <MdFormatListBulleted size={20} />
            </button>

            <button
                type={"button"}
                onClick={onImageUpload}
                className={twMerge(["p-2", "rounded", "hover:bg-gray-200"], ["transition-all"])}>
                <MdImage size={20} />
            </button>
        </div>
    );
}

export default EditorToolbar;
