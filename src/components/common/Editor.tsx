import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { twMerge } from "tailwind-merge";
import EditorToolbar, { FontSize } from "./EditorToolbar.tsx";
import Image from "@tiptap/extension-image";
import { uploadImage } from "../../api/upload.api.ts";
import { TextStyle } from "@tiptap/extension-text-style";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function Editor({ value, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: false, // 이미지를 Base64로 직접 웹에디터에 추가할 것이냐, 아니면 URL만 쓸 것이냐
            }),
            FontSize,
            TextStyle,
        ],
        content: value, // 초기값
        onUpdate: ({ editor }) => {
            // 에디터 안의 내용이 변경이 될 때마다 실행되는 내용을 적어줌
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: twMerge(["min-h-[440px]", "p-4"]),
            },
        },
    });

    // 이미지 업로드 핸들러
    const handleImageUpload = () => {
        // Vanilla Javascript를 통해 화면에 열려진 HTML문서에 input을 하나 생성
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            // 우리는 지금까지 onChange 함수에서
            // event => event.target.files 로 꺼내왔음. 즉, target이 input임
            // 지금은 input에 Javascript로 직접 접근하고 있기 때문에
            // input.files 로 접근함
            const file = input.files?.[0];
            if (!file) return;

            try {
                const url = await uploadImage(file, "editor");

                if (editor) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            } catch (error) {
                console.log(error);
                alert("이미지 업로드 실패");
            }
        };
    };

    return (
        <div
            className={twMerge(
                ["border", "border-gray-300", "rounded-lg", "overflow-hidden"],
                ["bg-white", "flex", "flex-col", "h-125"],
            )}>
            <div className={twMerge(["flex-none", "z-10"])}>
                <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
            </div>
            <div className={twMerge(["grow", "overflow-y-auto", "cursor-text"])}>
                <EditorContent editor={editor} placeholder={placeholder} className={"h-full"} />
            </div>
        </div>
    );
}

export default Editor;
