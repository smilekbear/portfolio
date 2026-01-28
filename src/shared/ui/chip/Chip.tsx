"use client";
import Image from "next/image";
import {cn} from "@/lib/utils";

type ChipProps = {
    icon?: string
    isActive: boolean;
    category: string;
    label: string;
    onClick: (value: string) => void;
}

export function Chip({ category, label, icon, isActive, onClick }: ChipProps) {
    return (
        <button
            type={"button"}
            className={cn(`inline-flex items-center gap-1 rounded-[10px] px-[14px] py-[10px] text-sm`,
                isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black hover:bg-gray-200 transition hover:cursor-pointer')}
            onClick={() => {
                onClick(category)
            }}
        >
            {icon && (
                <Image
                    src={icon}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                />
            )}
            <span>{label}</span>
        </button>
    )
}