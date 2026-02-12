import React from 'react';
import {ProjectDto} from "@/entities/dto/portfolio/portfolioDto";
import HeroCoverflowCarousel from "@/shared/ui/carousel/CarouselComponent";
type ProjectType = {
    projects? : ProjectDto[]
}
export const ProjectLayout = ({projects} : ProjectType) => {
    return (
        <div className={'flex w-full h-screen bg-black'}>
            {
                projects && (
                    <div className={'flex w-full h-screen justify-center items-center'}>
                        <HeroCoverflowCarousel projectDto={projects}/>
                    </div>
                )
            }
        </div>
    );
};
