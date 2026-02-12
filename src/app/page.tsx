'use client';

import React, {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {usePortfolio} from "@/features/portfolio/api/usePortfolio";
import {AboutLayout} from "@/src/app/portfolio/layout/about_layout";
import {RootLayout} from "@/src/app/portfolio/layout/root";
import {SkillsLayout} from "@/src/app/portfolio/layout/skills_layout";
import {ProjectLayout} from "@/src/app/portfolio/layout/project_layout";
import {CareerLayout} from "@/src/app/portfolio/layout/career_layout";

const SECTION_IDS = ["root", "about", "skills", "projects", "career"] as const;

type SectionId = typeof SECTION_IDS[number];

const Page = () => {
    const [isOnHero, setIsOnHero] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { data, reFetch } = usePortfolio();
    const NAV_ITEMS: { id: SectionId; label: string }[] = [
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "career", label: "Career" },
    ];
    const scrollToId = useCallback((id: SectionId, behavior: ScrollBehavior = "smooth") => {
        if (typeof window === "undefined") return;
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior, block: "start" });

        // keep URL clean (no #...)
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, []);
    const didFetchRef = useRef(false);
    useEffect(() => {
        if (didFetchRef.current) return;
        didFetchRef.current = true;
        reFetch();
    }, [reFetch]);

    useEffect(() => {
        const currentId = SECTION_IDS[currentIndex];
        setIsOnHero(currentId === "root" || currentId === "skills" || currentId === "projects");
    }, [currentIndex]);

    useEffect(() => {
        const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (elements.length === 0) return;

        const idToIndex = new Map<string, number>(SECTION_IDS.map((id, idx) => [id, idx]));

        const observer = new IntersectionObserver(
            (entries) => {
                // pick the most visible section
                let best: { id: string; ratio: number } | null = null;
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const ratio = entry.intersectionRatio;
                    const id = (entry.target as HTMLElement).id;
                    if (!best || ratio > best.ratio) best = { id, ratio };
                }
                if (!best) return;
                const idx = idToIndex.get(best.id);
                if (typeof idx === "number") setCurrentIndex(idx);
            },
            { threshold: [0.25, 0.4, 0.6, 0.8] }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const isScrollingRef = useRef(false);
    const wheelAccumRef = useRef(0);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            // Always prevent native scrolling for full-page navigation
            e.preventDefault();

            if (isScrollingRef.current) return;

            // Accumulate small trackpad deltas; require a minimum intent before switching sections
            wheelAccumRef.current += e.deltaY;
            const THRESHOLD = 60; // tune if needed

            if (Math.abs(wheelAccumRef.current) < THRESHOLD) return;

            const direction = wheelAccumRef.current > 0 ? "down" : "up";
            wheelAccumRef.current = 0;

            const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;

            // At the edges: do nothing (but native scroll is already prevented)
            if (nextIndex < 0 || nextIndex >= SECTION_IDS.length) return;

            isScrollingRef.current = true;
            scrollToId(SECTION_IDS[nextIndex]);

            // Cooldown to prevent skipping multiple sections
            window.setTimeout(() => {
                isScrollingRef.current = false;
            }, 900);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [currentIndex, scrollToId]);

    const getNavTextColor = (id: SectionId) => {
        const currentSection = SECTION_IDS[currentIndex];
        const isActive = currentSection === id;

        if (currentSection === "root") {
            return "text-white";
        }

        if (currentSection === "skills" || currentSection === "projects") {
            return isActive ? "text-white" : "text-white opacity-30";
        }

        return isActive
            ? "text-[#1E35FF]"
            : "text-black/30 hover:text-[#1E35FF] hover:opacity-100";
    };

    return (
        <div
            key={'container'}
            className={'flex w-full flex-col bg-black'}>

            <div
                key={"header"}
                className={'fixed top-0 left-0 flex  w-full z-50 items-center justify-start px-[100px] py-[40px]'}>

                <div
                    className={"flex w-full justify-between items-center"}>
                    <button
                        type="button"
                        onClick={() => scrollToId("root")}
                        className={"flex min-w-0"}>
                        <svg width="86" height="24" viewBox="0 0 86 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M75.6589 16.4883C69.1758 16.4883 65.25 13.3477 65.25 8.25537C65.25 3.20793 69.1758 0 75.6589 0C81.8505 0 86.0006 3.20793 86.0006 8.25537C86.0006 13.3477 81.8729 16.4883 75.6589 16.4883ZM75.6589 14.0431C80.4821 14.0431 83.3086 11.8671 83.3086 8.25537C83.3086 4.68851 80.4596 2.42277 75.6589 2.42277C70.8134 2.42277 67.9195 4.68851 67.9195 8.25537C67.9195 11.8671 70.8134 14.0431 75.6589 14.0431ZM71.3518 12.1139V4.03795H77.5209C79.6969 4.03795 81.0429 5.13717 81.0429 6.86452C81.0429 8.12077 80.4147 9.01809 79.4277 9.44432L81.1775 12.1139H77.8798L76.6011 9.98271H74.0438V12.0017L71.3518 12.1139ZM77.0722 7.85157C77.8349 7.85157 78.2612 7.53751 78.2612 7.02155C78.2612 6.50559 77.8349 6.21396 77.0722 6.21396H74.0438V7.85157H77.0722Z"
                                fill={isOnHero ? 'white' : 'black'}/>
                            <path
                                d="M54.3516 23.9991V15.2983H40.0717V23.9991H32.2676V0.088623H40.0717V8.78937H54.3516V0.088623H62.1557V23.9991H54.3516Z"
                                fill={isOnHero ? 'white' : 'black'}/>
                            <path
                                d="M0 23.9991V0.088623H17.0362C23.9437 0.088623 28.9582 5.10318 28.9582 12.0106C28.9582 18.9513 23.9437 23.9991 17.0362 23.9991H0ZM7.80411 17.4237H13.8814C18.597 17.4237 20.8884 15.6304 20.8884 12.0106C20.8884 8.45729 18.597 6.664 13.8814 6.664H7.80411V17.4237Z"
                                fill={isOnHero ? 'white' : 'black'}/>
                        </svg>
                    </button>


                    <Link
                        href={'/knowledge'}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        className={[
                            "flex items-center cursor-pointer border-b border-transparent hover:border-b gap-[8px]",
                            isOnHero ? "hover:border-white" : "hover:border-black",
                        ].join(" ")}>

                        <svg width="92" height="32" viewBox="0 0 92 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.42188 11.8672C7.41211 14.7383 8.89648 17.8145 11.875 19.0547L10.5273 21.0078C8.4375 20.1191 6.99219 18.3516 6.19141 16.2031C5.39062 18.5371 3.91602 20.4902 1.81641 21.457L0.390625 19.4844C3.33984 18.166 4.86328 14.875 4.86328 11.8672V10.7734H1.09375V8.74219H11.1328V10.7734H7.42188V11.8672ZM12.8906 24.7969V7.02344H15.4102V24.7969H12.8906ZM24.2289 9.54297C24.2094 11.7598 25.4789 13.918 28.4086 14.7969L27.1586 16.75C25.1371 16.1055 23.7309 14.8359 22.9398 13.2148C22.1391 14.9629 20.6938 16.3496 18.6039 17.0234L17.3539 15.0703C20.3227 14.123 21.6313 11.8086 21.6313 9.54297V7.84375H24.2289V9.54297ZM20.0688 20.3828V18.3906H32.2953V24.7969H29.7953V20.3828H20.0688ZM29.7953 17.6289V7.02344H32.2953V17.6289H29.7953ZM44.4344 8.89844V10.8516H40.8406C40.8699 12.668 42.1395 14.4844 45.0008 15.2266L43.868 17.1797C41.8465 16.6426 40.45 15.5195 39.6492 14.0938C38.868 15.7148 37.4422 17.0039 35.3523 17.6289L34.1609 15.6758C37.0223 14.8945 38.3406 12.8828 38.3602 10.8516H34.7859V8.89844H38.3602V6.94531H40.8797V8.89844H44.4344ZM36.4852 21.457C36.4754 19.2988 38.7898 18.0781 42.5789 18.0781C46.2898 18.0781 48.5652 19.2988 48.575 21.457C48.5652 23.5566 46.2898 24.7773 42.5789 24.7773C38.7898 24.7773 36.4754 23.5566 36.4852 21.457ZM38.9852 21.457C38.9656 22.4238 40.2156 22.9023 42.5789 22.9023C44.8836 22.9023 46.1141 22.4238 46.1141 21.457C46.1141 20.4414 44.8836 19.9922 42.5789 19.9922C40.2156 19.9922 38.9656 20.4414 38.9852 21.457ZM45.8992 17.7461V7.02344H48.3992V11.2422H50.8016V13.2539H48.3992V17.7461H45.8992ZM65.8312 8.56641V10.2461C65.8215 12.4727 65.8215 14.9727 65.1086 18.7422L62.6086 18.4883C63.2922 15.1289 63.3215 12.6289 63.3312 10.5391H52.8625V8.56641H65.8312ZM51.1828 22.6289V20.5977H56.9836V14.4844H59.4641V20.5977H67.3937V22.6289H51.1828Z"
                                fill={isOnHero ? 'white' : 'black'}/>
                            <path d="M76 16H88.5M88.5 16L83.5 11M88.5 16L83.5 21.5"
                                  stroke={isOnHero ? 'white' : 'black'} strokeWidth={2}/>
                        </svg>
                    </Link>

                </div>

                <div
                    key="header-center"
                    className="absolute flex left-1/2 -translate-x-1/2"
                >
                    <nav className="flex gap-[60px] transition-colors duration-300 font-bold">
                        {NAV_ITEMS.map(({id, label}) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => scrollToId(id)}
                                className={[
                                    "cursor-pointer transition-colors duration-300",
                                    getNavTextColor(id),
                                ].join(" ")}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div
                id="root"
                className={"flex w-full"}>
                <RootLayout/>
            </div>

            <div
                id={"about"}
                className={`flex flex-col min-h-screen px-[100px] py-[50px] gap-[40px] bg-white items-center`}>
                <AboutLayout/>
            </div>

            <div
            id={"skills"}
            className={"flex w-full h-screen bg-white"}>
                <SkillsLayout skills={data?.data.skills}/>
            </div>


            <div
                id={"projects"}
                className={'flex w-full min-h-screen py-[50px] bg-black'}>
                <ProjectLayout projects={data?.data.projects}/>
            </div>

            <div
                id={"career"}
                className={'flex w-full flex-col min-h-screen py-[50px] bg-[#F3F6Fc] items-center'}>
                <CareerLayout careers={data?.data.careers}/>
                {/*<div className="relative w-[360px] h-[800] overflow-hidden rounded-3xl shadow-xl">*/}
                {/*    <iframe*/}
                {/*        title="Figma Prototype"*/}
                {/*        style={{border: "1px solid rgba(0,0,0,0.1)", width: "100%", height: "100%"}}*/}
                {/*        src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Il8NKCcN1qhvJXdhlnxpZQ/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=1%3A2&node-id=424-18915&viewport=469%2C438%2C0.32&t=Vkzt7PEnBBV0Yl47-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=424%3A18915&show-proto-sidebar=1&hide-ui=1"*/}
                {/*        allowFullScreen*/}
                {/*    />*/}
                {/*</div>*/}
            </div>

        </div>

    );
};

export default Page;