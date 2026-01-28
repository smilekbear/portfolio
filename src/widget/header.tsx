import {useEffect, useState} from "react";

export default function Header() {
    const [isOnHero, setIsOnHero] = useState(true);

    useEffect(() => {
        const target = document.getElementById("root");
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsOnHero(entry.isIntersecting);
            },
            {
                threshold: 0.3, // hero의 30% 이상 보이면 hero 영역
            }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed top-0 left-0 z-50 w-full px-[100px] py-[40px]">
            <nav
                className={`flex gap-[20px] transition-colors duration-300 ${
                    isOnHero ? "text-white" : "text-black"
                }`}
            >
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#career">Career</a>
            </nav>
        </div>
    );
}