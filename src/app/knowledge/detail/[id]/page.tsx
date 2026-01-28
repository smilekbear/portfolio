"use client"
import React, {useEffect, useMemo} from 'react';
import "quill/dist/quill.snow.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import {useKnowledge} from "@/features/knowledge/api/useKnowledge";
import {useParams} from "next/navigation";
import DOMPurify from "dompurify";
import Link from "next/link";

const Page = () => {
    const {detailState, detailFetch} = useKnowledge()
    const params = useParams<{ id: string }>();
    const id = params.id;

    useEffect(() => {
        detailFetch(id)
    }, [detailFetch, id]);

    const safeHtml = useMemo(() => {
        const html = detailState.data?.item.contentHtml ?? "";

        const sanitized = DOMPurify.sanitize(html, {
            USE_PROFILES: { html: true },
            ADD_TAGS: ["pre", "code"],
            ADD_ATTR: ["class", "style", "data-language"],
        });

        return sanitized.replace(
            /<pre([^>]*)>([\s\S]*?)<\/pre>/g,
            (_m, preAttrs, inner) => {
                // 1) data-language 읽기
                const langMatch = String(preAttrs).match(/data-language="([^"]+)"/);
                const raw = (langMatch?.[1] || "text").toLowerCase();

                // 2) plain이면 kotlin로 강제(원하는 정책)
                const map: Record<string, string> = {
                    plain: "kotlin",
                    text: "kotlin",
                    kotlin: "kotlin",
                    kt: "kotlin",
                    js: "javascript",
                    ts: "typescript",
                    json: "json",
                    bash: "bash",
                    shell: "bash",
                    java: "java",
                };
                const prismLang = map[raw] ?? "kotlin";

                // 3) 기존 inner에 code가 이미 있으면 제거하고 다시 감싸도 됨(중복 방지)
                const innerNoCode = String(inner)
                    .replace(/^<code[^>]*>/i, "")
                    .replace(/<\/code>$/i, "");

                return `<pre class="language-${prismLang}"><code class="language-${prismLang}">${innerNoCode}</code></pre>`;
            }
        );
    }, [detailState.data?.item.contentHtml]);

    useEffect(() => {
        const root = document.querySelector(".ql-editor");
        if (!root) return;
        root.querySelectorAll("pre code").forEach((el) =>
            Prism.highlightElement(el as Element)
        );
    }, [safeHtml]);

    return (
        <div className={'flex justify-center w-full min-h-screen overflow-y-auto'}>
            <div className={"flex flex-col w-[1200px] max-w-[1200px] gap-[20px] p-[40px]"}>

                <div key={'detail-header'} className={'flex justify-between items-center'}>

                    <div className={'flex gap-[10px]'}>
                        <Link href={{
                            pathname: '/knowledge/',
                            query: {
                                page : 1,
                                category : detailState.data?.item.category
                            }
                        }}
                              className={'text-[12px] text-blue-600 cursor-pointer'}>
                            {detailState.data?.item.category}
                        </Link>

                        <p className={'text-[12px]'}>2025. 06. 23</p>
                    </div>

                    <button type={"button"} className={'text-black bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-[10px]'}>수정</button>

                </div>

                <h1 className={'text-[32px] font-bold text-black'}
                    dangerouslySetInnerHTML={{__html: detailState.data?.item.title ?? ''}}/>

                <div className="ql-container ql-snow !h-auto !overflow-visible">
                    <div
                        className="
                        ql-editor
                        [&_p]:my-3
                        [&_pre]:my-4
                        [&_pre]:!p-[10px]
                        [&_p:empty]:block
                        [&_p:empty]:h-6
                        [&_pre]:overflow-x-auto
                        [&_pre]:rounded-md
                        [&_pre]:p-4
                        [&_pre]:bg-gray-200
                        [&_pre]:text-sm
                        [&_pre]:leading-6
                        "
                        dangerouslySetInnerHTML={{__html: safeHtml}}
                    />
                </div>

                <div className={'flex flex-col w-full gap-[10px]'}>
                    <p className={'text-[16px] font-bold pb-[10px] border-b border-gray-100'}>{detailState.data?.item.category} 카테고리의
                        다른 글</p>

                    <div className={'flex flex-col gap-[10px]'}>
                        <div className={'flex justify-between'}>
                            <p className={'text-[14px]'}>MongoDB + PostGreSql 게시글 시스템 구축 및 접근 이슈 정리</p>
                            <p className={'text-[14px]'}>2025.08.16</p>
                        </div>
                        <div className={'flex justify-between'}>
                            <p className={'text-[14px]'}>MongoDB + PostGreSql 게시글 시스템 구축 및 접근 이슈 정리</p>
                            <p className={'text-[14px]'}>2025.08.16</p>
                        </div>
                        <div className={'flex justify-between'}>
                            <p className={'text-[14px]'}>MongoDB + PostGreSql 게시글 시스템 구축 및 접근 이슈 정리</p>
                            <p className={'text-[14px]'}>2025.08.16</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Page;