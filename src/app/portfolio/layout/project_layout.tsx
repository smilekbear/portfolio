import React from 'react';
import {ProjectDto} from "@/entities/dto/portfolio/portfolioDto";
import Card from "@/shared/ui/card/Card";
type ProjectType = {
    projects? : ProjectDto[]
}
export const ProjectLayout = ({projects} : ProjectType) => {
  return (
      <div>
          <div
              className={'flex flex-col max-w-[1200px] w-[1200px] gap-[40px] items-center'}>

              <div
                  className={"text-[48px] font-bold text-black"}>
                  Projects
              </div>

              <div
                  className={'flex flex-wrap justify-center gap-[20px] max-w-[1000px] mt-[60px] mx-auto'}>
                  {
                      projects?.map((item, index) => (
                          <Card
                              key={index}
                              {...item}
                          />
                      ))
                  }
              </div>

          </div>
      </div>
  );
};