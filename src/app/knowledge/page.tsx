import { Suspense } from "react";
import KnowledgePageClient from "./KnowledgePageClient";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-10 text-gray-500">Loading...</div>}>
            <KnowledgePageClient />
        </Suspense>
    );
}
// "use client";
// import React, {useEffect, useState} from 'react';
// import {Chip} from "@/shared/ui/chip/Chip";
// import {Divider} from "@mui/material";
// import Link from "next/link";
// import KnowledgeList from "@/src/widget/knowledge_list/KnowledgeList";
// import {PaginationComponent} from "@/shared/ui/pagination/PaginationComponent";
// import {useKnowledge} from "@/features/knowledge/api/useKnowledge";
// import {useRouter, useSearchParams} from "next/navigation";
// import {InputComponent} from "@/shared/ui/input/input_component";
//
//
// const Page = () => {
//     const router = useRouter();
//     const {state, fetch} = useKnowledge()
//     const searchParams = useSearchParams();
//     const page = Number(searchParams.get("page") ?? 1);
//     const category = searchParams.get('category') ?? 'ALL'
//     const keyword = searchParams.get('keyword') ?? ''
//     const [searchValue, setSearchValue] = useState('')
//
//     useEffect(() => {
//         fetchKnowledgeList();
//     }, [category, page, keyword]);
//
//     useEffect(() => {
//         setSearchValue(keyword)
//     }, [keyword]);
//
//     const fetchKnowledgeList = () => {
//         const limit = 10;
//         const offset = (page - 1) * limit;
//
//         fetch(keyword, limit, offset, category);
//     };
//
//     const handleCalculateTotalPage = () : number => {
//
//         return Math.ceil(state.total / 10);
//     }
//
//     const goWithParams = (next: { page?: number; category?: string; keyword?: string }) => {
//         const sp = new URLSearchParams(searchParams.toString());
//         if (next.page !== undefined) sp.set("page", String(next.page));
//         if (next.category !== undefined) sp.set("category", next.category);
//         if (next.keyword !== undefined) {
//             if (next.keyword.trim() === "") sp.delete("keyword");
//             else sp.set("keyword", next.keyword.trim());
//         }
//         router.push(`/knowledge?${sp.toString()}`);
//     };
//
//
//     return (
//         <main className={"flex min-h-screen w-full bg-white text-black justify-center"}>
//             <div className={"flex flex-col w-full max-w-[1440px] p-[40px] gap-[40px] items-start"}>
//                 <div className={'flex w-full justify-between'}>
//                     <h1 className={"text-[28px] font-bold"}>지식창고</h1>
//
//                     <form
//                         className={'flex w-[320px]'}
//                         onSubmit={(e) => {
//                             e.preventDefault()
//                             goWithParams({page : 1, keyword: searchValue})
//                         }
//                     }>
//                         <InputComponent
//                             value={searchValue}
//                             searchIcon={true}
//                             placeholder={'제목을 입력하세요.'}
//                             onChanged={setSearchValue}
//                             onSearchClicked={() => {goWithParams({page : 1, keyword: searchValue})}}
//                         />
//                     </form>
//
//                 </div>
//
//
//                 <div className={"flex w-full gap-4"}>
//                     {[
//                         {key: "ALL", label: "전체"},
//                         {key: "Android", label: "Android"},
//                         {key: "React", label: "React"},
//                         {
//                             key: "Flutter",
//                             label: "Flutter",
//                             icon: "https://smilekbear.s3.ap-northeast-2.amazonaws.com/flutter_no_Bg.png",
//                         },
//                         { key: "AWS", label: "AWS" },
//                         { key: "SpringBoot", label: "Spring Boot" },
//                         { key: "ELSE", label: "else" },
//                     ].map((c,i) => (
//
//                         <Chip
//                             key={`${c.label}-${i}`}
//                             category={c.key}
//                             label={c.label}
//                             icon={c.icon}
//                             isActive={category === c.key}
//                             onClick={(value) => {
//                                 goWithParams({page : 1, category: value, keyword: ''})
//                             }}
//                         />
//
//                     ))}
//                 </div>
//
//                 <Divider orientation={"horizontal"} className={"w-full bg-gray-100"}/>
//
//                 <div className={'flex w-full justify-between'}>
//                     <p>총 {state.total}</p>
//                 </div>
//
//                 <div
//                     className={"flex flex-col w-full"}>
//                     {(() => {
//                         const data = state.data
//                         if (!data) return null
//
//                         if (data.length === 0) {
//                             return (
//                                 <div className="flex w-full justify-center py-20 text-gray-400 text-sm">
//                                     작성된 글이 없습니다.
//                                 </div>
//                             )
//                         }
//
//                         return data.map((item, index) => (
//                             <div
//                                 key={item.id ?? index}>
//                                 <KnowledgeList knowledgeItemDto={item}/>
//
//                                 {index !== data.length - 1 && (
//                                     <div className="my-6 h-px w-full bg-gray-200"/>
//                                 )}
//                             </div>
//                         ))
//                     })()}
//                 </div>
//
//                 <PaginationComponent
//                     page={page}
//                     totalPage={handleCalculateTotalPage()}
//                 />
//
//             </div>
//
//             <Link
//                 href="/knowledge/write"
//                 className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white shadow-lg transition hover:bg-gray-800 active:scale-95">
//                 <span className="text-base font-semibold">글쓰기</span>
//             </Link>
//         </main>
//     );
// };
//
// export default Page;