"use client";

import dynamic from "next/dynamic";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import {useKnowledge} from "@/features/knowledge/api/useKnowledge";
import {KnowledgeCreateDto} from "@/entities/dto/knowledge/knowledge_create_dto";
import type ReactQuill from "react-quill-new";

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false }) as unknown as typeof ReactQuill;

// next/dynamic components don't type `ref` well; use an `any` alias only where we need refs
const QuillEditorWithRef = QuillEditor as unknown;

type Category = { id: string; name: string };
const CATEGORIES: Category[] = [
    { id: "1", name: "Android" },
    { id: "2", name: "React" },
    { id: "3", name: "Flutter" },
    { id: "4", name: "AWS" },
    { id: "5", name: "Spring Boot" },
];

export default function WritePage() {
    const bodyQuillRef = useRef<ReactQuill | null>(null);
    const router = useRouter()
    const {writeState, writeFetch} = useKnowledge()

    const [writeData, setWriteData] = useState<{
        categoryId : number | null
        title : string
        content : string
        imageList : File[]
    }>({
        categoryId : null,
        title : '',
        content: '',
        imageList : []
    })

    useEffect(() => {
        console.log(`WritePage:: state : ${writeState.httpStatusCode}`)
        if(writeState.httpStatusCode === 201){router.back()}
    }, [writeState]);

    const createImageId = () => crypto.randomUUID();

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            // 1) Keep the original File so we can upload later
            setWriteData((prev) => ({
                ...prev,
                imageList: [...prev.imageList, file],
            }));

            // 2) Insert a preview URL into the editor content
            const reader = new FileReader();
            reader.onload = () => {
                const editor = bodyQuillRef.current?.getEditor?.();
                const imageId = createImageId();

                if (!editor) return;

                // If selection is null, insert at the end
                const range = editor.getSelection?.(true) ?? { index: editor.getLength?.() ?? 0, length: 0 };
                const src = typeof reader.result === "string" ? reader.result : "";
                if (!src) return;

                editor.insertEmbed(range.index, "image", src, "user");
                editor.setSelection(range.index + 1, 0, "silent");
            };

            reader.readAsDataURL(file);
        };
    }, []);

    const bodyModules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    [{ font: [] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link", "image"],
                    ["clean"],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        [imageHandler]
    );

    const titleModules = useMemo(
        () => ({
            toolbar: false,
            clipboard: { matchVisual: false },
        }),
        []
    );
    const handleFetchWriteKnowledge = () => {
        const doc = new DOMParser().parseFromString(writeData.content, "text/html")
        const text = (doc.body.textContent ?? "").replace(/\u00A0/g, " ").trim() // &nbsp; 처리
        const hasText = text.length > 0
        console.log(`content has Text ${hasText}`)

        const hasImage = doc.body.querySelector("img") !== null
        doc.querySelectorAll("img").forEach((img) => img.remove());

        const summaryText = (doc.body.textContent ?? "")
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const writeReq : KnowledgeCreateDto = {
            categoryId : Number(writeData.categoryId),
            title : writeData.title,
            summary : summaryText,
            content : writeData.content,
            imageUrlList : []
        }

        writeFetch(writeReq, writeData.imageList)
    }


    return (
        <main className="h-screen w-full bg-white text-black flex flex-col">
            {/* 중앙 컨테이너 */}
            <div className="mx-auto w-full max-w-[1000px] h-full flex flex-col">

                <div className="flex-1 overflow-y-auto px-10 pb-[96px]">
                    {/* 카테고리 */}
                    <div className="pt-10">
                        <select
                            value={writeData.categoryId ? String(writeData.categoryId) : ""}
                            className="h-10 w-[220px] rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                            onChange={(e) => {
                                console.log(`e.target.value ${e.target.value}`)
                                setWriteData((prevState) => ({
                                    ...prevState,
                                    categoryId : Number(e.target.value)
                                }))
                            }}>
                            <option value="" disabled>
                                카테고리
                            </option>
                            {CATEGORIES.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 제목 (Quill) */}
                    <div className="mt-6">
                        <div className="title-quill">
                            <QuillEditor
                                theme="snow"
                                value={writeData.title}
                                onChange={(v) => {
                                    setWriteData((prevState) => ({
                                        ...prevState,
                                        title : v
                                    }))
                                }}
                                modules={titleModules}
                                placeholder="제목을 입력하세요"
                            />
                        </div>

                        {/* 구분선 */}
                        <div className="mt-4 h-px w-full bg-gray-200" />
                    </div>

                    {/* 본문 (Quill) */}
                    <div className="mt-6 flex flex-col flex-1">
                        <div className="body-quill flex-1">
                            <QuillEditor
                                ref={(el) => {bodyQuillRef.current = el}}
                                theme="snow"
                                value={writeData.content}
                                onChange={(v: string) =>
                                    setWriteData((prev) => ({ ...prev, content: v }))
                                }
                                modules={bodyModules}
                                placeholder="내용을 입력하세요..."
                            />
                        </div>
                    </div>

                    {/* 태그 입력(스샷 하단 #태그입력 느낌) */}
                    <div className="mt-16 text-sm text-gray-400">#태그입력</div>
                </div>

                <div className="fixed bottom-0 left-0 z-50 h-[60px] w-full bg-gray-200 border-t border-gray-300">
                    <div className="mx-auto flex h-full w-full  items-center justify-end px-10 gap-[20px]">

                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-900 cursor-pointer"
                            onClick={() => router.back()}>
                            나가기
                        </button>

                        <button
                            type="button"
                            className="rounded-[14px] bg-transparent px-4 py-2 text-center cursor-pointer"
                            onClick={handleFetchWriteKnowledge}
                        >
                            저장
                        </button>
                    </div>

                </div>
            </div>

        </main>
    );
}