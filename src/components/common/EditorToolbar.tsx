import { type CommandProps, type Editor, Extension } from "@tiptap/react";
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

// 원래 @tiptap/react 에는 fontSize에 관련된 기능이 없어, 사용할 수 있는 기능(타입)을 확장
declare module "@tiptap/react" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}

// fontSize라고 하는 기능을 사용하기 위해 @tiptap/react의 extension의 코드를 작성함
export const FontSize = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: Array.isArray(this.options.types) ? this.options.types : ["textStyle"],
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace(/['"]+/g, ""),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) return {};
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (size: string) =>
                ({ chain }: CommandProps) => {
                    return chain().setMark("textStyle", { fontSize: size }).run();
                },
            unsetFontSize:
                () =>
                ({ chain }: CommandProps) => {
                    return chain().setMark("textStyle", { fontSize: null }).run();
                },
        };
    },
});

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px", "2rem"];

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

            <select
                className={twMerge(["p-1", "border", "rounded", "text-sm", "bg-white"])}
                value={editor.getAttributes("textStyle").fontSize || "16px"}
                onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}>
                {FONT_SIZES.map((size, index) => (
                    <option value={size} key={index}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default EditorToolbar;
