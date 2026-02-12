import React, {useState} from "react";
import Image from "next/image";
import { KnowledgeItemDto } from "@/entities/dto/knowledge/KnowledgeDto";
import Link from "next/link";

type Props = {
    knowledgeItemDto: KnowledgeItemDto;
};

const KnowledgeList = ({ knowledgeItemDto }: Props) => {
    const [imageError, setImageError] = useState(false);
    // const getEllipsisTextFromHtml = (html: string, maxLength: number) => {
    //     // HTML → text
    //     const text = html
    //         .replace(/<[^>]*>/g, "")      // 태그 제거
    //         .replace(/\s+/g, " ")         // 공백 정리
    //         .trim();
    //
    //     if (text.length <= maxLength) return text;
    //     return text.slice(0, maxLength) + "...";
    // }

    // const summaryText = useMemo(() => {
    //     return getEllipsisTextFromHtml(knowledgeItemDto.summary, 400);
    // }, [knowledgeItemDto.summary]);

    return (
        <Link
            href={`/knowledge/detail/${knowledgeItemDto.contentRef}`}
            className="group flex flex-col w-full cursor-pointer">
            <div className="flex gap-[20px] justify-between">
                <div className="flex flex-col gap-[20px]">
                    <p className="text-[18px] font-bold group-hover:text-blue-700"
                        dangerouslySetInnerHTML={{__html: knowledgeItemDto.title}}/>

                    <p className="text-[14px] font-normal line-clamp-2"
                       dangerouslySetInnerHTML={{__html : knowledgeItemDto.summary}}/>
                    {/*<p>{summaryText}</p>*/}

                </div>

                {knowledgeItemDto.thumbnailUrl && !imageError && (
                    <Image
                        className={"rounded-[6px]"}
                        src={knowledgeItemDto.thumbnailUrl}
                        alt=""
                        width={100}
                        height={100}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            <div className="flex gap-[4px] text-[12px] text-gray-500">
                <p>{knowledgeItemDto.category}</p>
                <p>{knowledgeItemDto.updatedAt}</p>
            </div>
        </Link>
    );
};

export default KnowledgeList;