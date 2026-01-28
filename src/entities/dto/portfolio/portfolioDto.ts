export type AboutDto = {
  iconKey: string;
  value: string;
};

export type SkillCategoryDto = {
  category: string;
  iconKey : string
  items: string[];
};

export type ProjectDto = {
  title: string;
  category: string;
  dateRange: string;
  thumbnailUrl: string;
  skills: string[];
  review: string;
};

export type CareerDto = {
  period: string;
  title: string;
  subTitle: string;
  works: string[];
  skills: string[];
};
export type PortfolioData = {
  about: AboutDto[]
  skills: SkillCategoryDto[]
  projects: ProjectDto[]
  careers: CareerDto[]
}

export type PortfolioResponse = {
  code: number,
  message : string,
  data: PortfolioData
};