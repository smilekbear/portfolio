import React from 'react';
import {ProjectDto} from "@/entities/dto/portfolio/portfolioDto";
import GridCardComponent from "@/shared/ui/card/GridCardComponent";
type ProjectType = {
    projects? : ProjectDto[]
    onProjectPopUpOpen : (open : boolean) => void
}
export const ProjectLayout = ({projects, onProjectPopUpOpen} : ProjectType) => {
    return (
        <div className={'flex w-full min-h-screen bg-black pt-[17.59vh] pb-[21.96vh] px-[5.31vw]'}>
            {
                projects && (
                    <div className={'flex w-full justify-center items-center'}>
                        {/*<HeroCoverflowCarousel projectDto={projects}/>*/}
                        <GridCardComponent items={projects} onPopUpOpen={(open) => {
                            onProjectPopUpOpen(open)
                        }}/>
                    </div>
                )
            }
        </div>
    );
};
