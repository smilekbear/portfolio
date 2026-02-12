"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ProjectDto } from "@/entities/dto/portfolio/portfolioDto";
import {EmblaCarouselType} from "embla-carousel";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

type Tween = {
    scaleX: number;
    scaleY: number;
    translateX: number;
    translateY: number;
    dim: number;
    zIndex: number;
    isCenter: boolean;
};

function useCoverflowTweens(emblaApi: EmblaCarouselType | undefined) {
    const [tweens, setTweens] = useState<Tween[]>([]);
    const [selected, setSelected] = useState(0);

    const onUpdate = useCallback(() => {
        if (!emblaApi) return;

        const count = emblaApi.slideNodes().length;
        const sel = emblaApi.selectedScrollSnap();
        setSelected(sel);

        const next: Tween[] = new Array(count).fill(0).map((_, i) => {
            // ✅ loop-aware delta (첫/끝에서 "휑" 비는 현상 해결 핵심)
            let delta = i - sel;
            if (Math.abs(delta) > count / 2) {
                delta = delta - Math.sign(delta) * count;
            }

            const dist = Math.abs(delta); // 0,1,2...
            const dir = Math.sign(delta) || 0; // -1(left), 0(center), 1(right)

            // 0(center) ~ 1(far)
            const t = clamp(dist / 2, 0, 1);

            // ✅ 좌우는 더 작게 (height도 줄어듦)
            const scaleX = 1 - t * 0.14; // 1.00 ~ 0.86
            const scaleY = 1 - t * 0.32; // 1.00 ~ 0.68

            // ✅ 세로는 가운데 유지(아래로 깔리지 않게)
            const translateY = 0;

            // ✅ 오버랩: 좌/우가 센터 "뒤로" 더 들어가서 절반만 보이게
            // 숫자 키우면 더 많이 숨겨짐
            const overlap = 340;
            // dist=1(바로 옆)일 때 가장 많이 들어가고, 멀어질수록 덜 적용
            const overlapStrength = 1 - clamp((dist - 1) / 1, 0, 1); // dist=1 => 1, dist>=2 => 0
            const translateX = dir * -overlap * overlapStrength;

            // ✅ 좌/우는 dim만(텍스트 없음)
            const dim = dist === 0 ? 0.18 : 0.55;

            // ✅ 센터가 항상 위에 올라오게
            const zIndex = 1000 - dist * 10;

            return {
                scaleX,
                scaleY,
                translateX,
                translateY,
                dim,
                zIndex,
                isCenter: dist === 0,
            };
        });

        setTweens(next);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onUpdate();
        emblaApi.on("select", onUpdate);
        emblaApi.on("reInit", onUpdate);
        emblaApi.on("scroll", onUpdate);
        return () => {
            emblaApi.off("select", onUpdate);
            emblaApi.off("reInit", onUpdate);
            emblaApi.off("scroll", onUpdate);
        };
    }, [emblaApi, onUpdate]);

    return { tweens, selected };
}

export default function HeroCoverflowCarousel({ projectDto }: { projectDto: ProjectDto[] }) {
    const options = useMemo(
        () => ({
            loop: true,
            align: "center" as const,
            skipSnaps: false,
            containScroll: false as const,
        }),
        []
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { tweens, selected } = useCoverflowTweens(emblaApi);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div className="w-full bg-black py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="relative">
                    <div ref={emblaRef} className="overflow-visible">
                        <div className="flex items-center">
                            {projectDto.map((s, i) => {
                                const tw =
                                    tweens[i] ??
                                    ({
                                        scaleX: 0.9,
                                        scaleY: 0.75,
                                        translateX: 0,
                                        translateY: 0,
                                        dim: 0.55,
                                        zIndex: 1,
                                        isCenter: false,
                                    } as Tween);

                                const isSelected = i === selected;

                                return (
                                    <div
                                        key={`${s.title}-${s.dateRange}-${i}`}
                                        // 더 숨기고 싶으면 lg:48% / sm:56%로 더 줄여도 됨
                                        className="min-w-0 flex-[0_0_72%] sm:flex-[0_0_60%] lg:flex-[0_0_54%]"
                                        style={{ position: "relative", zIndex: tw.zIndex }}
                                    >
                                        <div
                                            className="relative overflow-hidden rounded-3xl shadow-2xl will-change-transform"
                                            style={{
                                                transform: `translate3d(${tw.translateX}px, ${tw.translateY}px, 0) scaleX(${tw.scaleX}) scaleY(${tw.scaleY})`,
                                                transformOrigin: "center center",
                                                transition: "transform 260ms ease, opacity 260ms ease",
                                            }}
                                        >
                                            {/* 배경 이미지 */}
                                            <div
                                                className="h-[280px] sm:h-[360px] lg:h-[420px] w-full bg-cover bg-center"
                                                style={{ backgroundImage: `url(${s.thumbnailUrl})` }}
                                            />

                                            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${tw.dim})` }} />

                                            {isSelected && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                                    <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                                                        {s.title}
                                                    </h2>
                                                    <p className="mt-3 text-white/85 text-sm sm:text-base">
                                                        {s.category} · {s.dateRange}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Prev / Next */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-24 top-1/2 z-50 -translate-y-1/2 rounded-full bg-transparent backdrop-blur px-5 py-3 text-white hover:bg-white/15"
                    >
                        ← Prev
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-24 top-1/2 z-50 -translate-y-1/2 rounded-full bg-transparent backdrop-blur px-5 py-3 text-white hover:bg-white/15"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}