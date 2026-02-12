import React from 'react';
import {SkillCategoryDto} from "@/entities/dto/portfolio/portfolioDto";
import {CustomCard} from "@/shared/ui/card/custom_card";

type SkillsType =  {
    skills? : SkillCategoryDto[]
}
export const SkillsLayout = ({skills} : SkillsType) => {

  return (
      <div className={'flex w-full min-h-screen bg-[#1E35FF]'}>

          <div className={'flex flex-col w-full items-center px-[100px] pt-[100px] gap-[3rem]'}>
              <h1 className={"text-[7.5rem] font-bold text-white"}>Skills</h1>


              <div className={'flex w-full gap-[0.5rem]'}>
                  {
                      skills?.map((item, index) => (
                          <div
                              key={`${item.category}_${index}`}
                              className={'flex flex-1 min-w-0'}>
                              <CustomCard key={`${item.category}-${index}`} title={item.category} value={item.items}/>
                          </div>

                      ))
                  }
              </div>
          </div>

      </div>
  );
};