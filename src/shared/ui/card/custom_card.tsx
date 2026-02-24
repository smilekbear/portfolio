import React from 'react';

type CustomCardProps = {
    title : string
    value : string[]
}
export const CustomCard = (item:CustomCardProps) => {
    return (
        <div className={"flex flex-col w-[14.58vw]  min-h-[51.67vh] items-center px-[2.08vw] pt-[4.44vh] pb-[6.67vh] gap-[3.43vh] rounded-[30px] bg-black/10 backdrop-blur-[50px]"}>

            <div className={'flex flex-col w-full gap-[1.48vh] items-center'}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2720_1153)">
                        <path
                            d="M16 30.5C24.0081 30.5 30.5 24.0081 30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 24.0081 7.99187 30.5 16 30.5Z"
                            stroke="white" stroke-width="2.175" stroke-linecap="square"/>
                        <path d="M10.1992 11.7224V11.5774M21.7992 11.7224V11.5774" stroke="white" stroke-width="2.175"
                              stroke-linecap="square"/>
                        <path
                            d="M21.7992 18.8999C21.0742 21.0749 19.2037 23.2499 15.9992 23.2499C12.7947 23.2499 10.9242 21.0749 10.1992 18.8999"
                            stroke="white" stroke-width="2.175" stroke-linecap="square"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2720_1153">
                            <rect width="32" height="32" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>


                <div className={"flex w-full justify-center gap-[1.48vh] pb-[2.22vh] border-b border-white/20"}>
                    <p className={"text-[1.67vw] font-bold text-white"}>{item.title}</p>
                </div>

            </div>


            <div className={"flex flex-col items-center gap-[24px]"}>
                {item.value.map((v, i) => (
                    <div key={`${v}-${i}`} className={'flex items-center gap-[1.67vh] text-white'}>
                        <span className={"text-[1.04vw] font-light"}>{v}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};