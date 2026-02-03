import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { twMerge } from "tailwind-merge";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function Editor({ value, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value, // 초기값
        onUpdate: ({ editor }) => {
            // 에디터 안의 내용이 변경이 될 때마다 실행되는 내용을 적어줌
            onChange(editor.getHTML());
        },
    });

    return (
        <div
            className={twMerge(
                ["border", "border-gray-300", "rounded-lg", "overflow-hidden"],
                ["bg-white", "flex", "flex-col", "h-125"],
            )}>
            <div className={twMerge(["grow", "overflow-y-auto", "cursor-text"])}>
                <EditorContent editor={editor} placeholder={placeholder} className={"h-full"} />
            </div>
        </div>
    );
}

export default Editor;
