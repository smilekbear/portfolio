'use client';
import React, { useMemo } from "react";
import Image from "next/image";
import {ProjectDto} from "@/entities/dto/portfolio/portfolioDto";

// --- 컴포넌트 밖으로 뺀 유틸 함수들 ---
function getContrastYIQ(r: number, g: number, b: number): string {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF";
}

function getRandomRGBColor(): { bg: string; text: string } {
    const r = Math.floor(Math.random() * 156 + 50); // 50~205
    const g = Math.floor(Math.random() * 156 + 50);
    const b = Math.floor(Math.random() * 156 + 50);
    const bg = `rgb(${r}, ${g}, ${b})`;
    const text = getContrastYIQ(r, g, b);
    return { bg, text };
}

const Card: React.FC<ProjectDto> = (projectDto : ProjectDto) => {
    // skills가 바뀔 때만 랜덤 색상 배열 생성
    const skillColors = useMemo(
        () => projectDto.skills.map(() => getRandomRGBColor()),
        [projectDto.skills]
    );

    const handleClickItem = () => {
        // setProjectDetail(fullTitle, skills, projectInfo, image, review);
        // navigate('/project_detail');
    };

    return (
        <div
            className='bg-white rounded-[12px] shadow-md overflow-hidden w-full max-w-[320px] flex flex-col font-sans box-border cursor-pointer
      hover:border-[#4A90E2] hover:shadow-[0_4px_12px_rgba(74,144,226,0.4)] '
            onClick={handleClickItem}
        >
            {/* <img> 대신 Next Image */}
            <Image
                className="w-full h-[180px] object-cover"
                src={projectDto.thumbnailUrl}
                alt="thumbnail"
                width={320}
                height={180}
            />

            <div className="flex flex-col px-[20px] pt-[20px] gap-[14px]">
                <h3 className="font-[16px] text-[#121212]">
                    {projectDto.title} | <span>{projectDto.category}</span>
                </h3>

                <div className="flex gap-[10px] flex-wrap">
                    {projectDto.skills.map((item, index) => {
                        const color = skillColors[index];

                        return (
                            <div
                                key={item} // 또는 key={`${item}-${index}`}
                                style={{
                                    backgroundColor: color.bg,
                                    color: color.text,
                                    borderRadius: "4px",
                                    padding: "4px 10px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    display: "inline-block",
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>

                <p className="card-date">{projectDto.dateRange}</p>

                <div className="flex items-center justify-end px-[12px] py-[16px]">
                    <div className="vote-section">
                        <div className={"flex gap-[10px] items-center"}>
                            view Detail
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.4936 5.71047C14.1036 6.10047 14.1036 6.73047 14.4936 7.12047L18.3736 11.0005H3.20361C2.65361 11.0005 2.20361 11.4505 2.20361 12.0005C2.20361 12.5505 2.65361 13.0005 3.20361 13.0005H18.3836L14.5036 16.8805C14.1136 17.2705 14.1136 17.9005 14.5036 18.2905C14.8936 18.6805 15.5236 18.6805 15.9136 18.2905L21.5036 12.7005C21.8936 12.3105 21.8936 11.6805 21.5036 11.2905L15.9036 5.71047C15.5236 5.32047 14.8836 5.32047 14.4936 5.71047Z"
                                    fill="#333333"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;