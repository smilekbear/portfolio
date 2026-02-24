import React, {useEffect, useState} from 'react';
import {ProjectDto} from "@/entities/dto/portfolio/portfolioDto";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";

type Props = {
    items: ProjectDto[]
    onPopUpOpen: (open : boolean) => void
}

const GridCardComponent = ({items, onPopUpOpen} : Props) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ProjectDto | null>(null);

    const onClickCard = (e: React.MouseEvent, item: ProjectDto) => {
        e.stopPropagation();
        setSelected(item);
        setOpen(true);
    };

    useEffect(() => {
        console.log(`onPopUpOpen1 :: ${open}`)
        onPopUpOpen(open)
    }, [open, onPopUpOpen]);

    return (
        <div className="w-full grid grid-cols-3 gap-[2vh]">
            {items.map((item) => (
                <div
                    key={item.title}
                    onClick={(e) => onClickCard(e, item)}
                    // cursor-pointer가 확실히 먹히도록 relative와 z-index 최적화
                    className="relative cursor-pointer flex flex-col justify-center items-center gap-[1.39vh] rounded-[18.27px] h-[31.57vh] w-[28.86vw] overflow-hidden group transition-transform hover:scale-[1.02]"
                    style={{
                        // 배경 이미지와 검은색 오버레이(20%)를 하나로 합침으로써 레이어 간섭 제거
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("${item.thumbnailUrl}")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    {/* 텍스트가 클릭을 방해하지 않도록 pointer-events-none 처리하거나 z-index 확보 */}
                    <p className="relative z-10 text-[2.08vw] text-white font-bold leading-none pointer-events-none">
                        {item.title}
                    </p>
                    <p className="relative z-10 text-[1.04vw] text-white font-normal leading-none pointer-events-none">
                        {item.category}
                    </p>
                </div>
            ))}

            <Dialog
                open={open}
                onOpenChange={setOpen}>
                <DialogTitle className="sr-only">Project Detail</DialogTitle>
                <DialogContent
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[47.4vw] bg-black/40 backdrop-blur-[160px] rounded-[40px] flex flex-col gap-[3.42vh] border-none"
                    showCloseButton={false}
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <div className={'relative'}>
                        <svg
                            className="absolute top-[40px] right-[40px] cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => {setOpen(false)}}
                            width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="29.9004" y="8.68628" width="2" height="30" transform="rotate(45 29.9004 8.68628)"
                                  fill="white"/>
                            <rect x="8.6875" y="10.1006" width="2" height="30" transform="rotate(-45 8.6875 10.1006)"
                                  fill="white"/>
                        </svg>

                        <div className={'flex flex-col gap-[37px] p-[80px]'}>
                            <div className={'flex flex-col gap-[20px]'}>
                                <p className={'text-white text-[22px] font-bold'}>{selected?.organization}</p>
                                <p className={'text-white text-[60px] font-bold'}>{selected?.title}</p>
                            </div>

                            <div className={'flex flex-col gap-[23px]'}>
                                <div className={'flex gap-[1rem]'}>
                                    <p className={'text-white text-[24px] font-bold leading-none tracking-[-0.04em]'}>{selected?.major}</p>
                                    <p className={'text-white text-[24px] font-bold leading-none tracking-[-0.04em]'}>|</p>
                                    <p className={'text-white text-[24px] font-bold leading-none tracking-[-0.04em]'}>{selected?.dateRange}</p>
                                </div>

                                <p className={'text-white/60 whitespace-pre-line text-[18px] leading-[1.6]'}>{selected?.review}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GridCardComponent;
// import React, {useEffect, useState} from 'react';
// import {ProjectDto} from "@/entities/dto/portfolio/portfolioDto";
// import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
//
// type Props = {
//     items: ProjectDto[]
//     onPopUpOpen: (open : boolean) => void
// }
// const GridCardComponent = ({items, onPopUpOpen} : Props) => {
//     const [open, setOpen] = useState(false);
//     const [selected, setSelected] = useState<ProjectDto | null>(null);
//
//     const onClickCard = (e: React.MouseEvent, item: ProjectDto) => {
//         e.stopPropagation();
//         setSelected(item);
//         setOpen(true);
//     };
//
//     useEffect(() => {
//         console.log(`onPopUpOpen1 :: ${open}`)
//         onPopUpOpen(open)
//     }, [open]);
//
//     return (
//         <div className="w-full grid grid-cols-3 gap-[2vh]">
//             {items.map((item) => (
//                 <div
//                     key={item.title}
//                     onClick={(e) => onClickCard(e, item)}
//                     className="relative cursor-pointer flex flex-col justify-center items-center gap-[1.39vh] rounded-[18.27px] h-[31.57vh] w-[28.86vw] overflow-hidden"
//                     style={{
//                         backgroundImage: `url("${item.thumbnailUrl}")`,
//                         backgroundSize: "cover",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center",
//                     }}
//                 >
//                     <div className="absolute inset-0 bg-black/20 pointer-events-none"/>
//
//                     <p className="text-[2.08vw] text-white font-bold leading-none">{item.title}</p>
//                     <p className="text-[1.04vw] text-white font-normal leading-none">{item.category}</p>
//                 </div>
//             ))}
//
//             <Dialog
//                 open={open}
//                 onOpenChange={setOpen}>
//                 <DialogTitle/>
//                 <DialogContent
//                     className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[47.4vw] bg-black/40 backdrop-blur-[160px] rounded-[40px] flex flex-col gap-[3.42vh]"
//                     showCloseButton={false}
//                     onInteractOutside={(e) => e.preventDefault()}
//                     onEscapeKeyDown={(e) => e.preventDefault()}
//                 >
//                     <div className={'relative'}>
//                         <svg
//                             className="absolute top-[40px] right-[40px] cursor-pointer"
//                             onClick={() => {setOpen(false)}}
//                             width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <rect x="29.9004" y="8.68628" width="2" height="30" transform="rotate(45 29.9004 8.68628)"
//                                   fill="white"/>
//                             <rect x="8.6875" y="10.1006" width="2" height="30" transform="rotate(-45 8.6875 10.1006)"
//                                   fill="white"/>
//                         </svg>
//
//                         <div className={'flex flex-col gap-[37px] p-[80px]'}>
//                             <div className={'flex flex-col gap-[20px]'}>
//                                 <p className={'text-white text-[22px] font-bold'}>{selected?.organization}</p>
//                                 <p className={'text-white text-[60px] font-bold'}>{selected?.title}</p>
//                             </div>
//
//                             <div
//                                 className={'flex flex-col gap-[23px]'}>
//                                 <div className={'flex gap-[1rem]'}>
//                                     <p className={'text-white text-[24px] font-bold leading-none tracking-[-0.04em]'}>{selected?.major}</p>
//                                     <p className={'text-white text-[24px] font-bold leading-none tracking-[-0.04em]'}>|</p>
//                                     <p className={'text-white text-[24px] font-bold leading-none tracking-[-0.04em]'}>{selected?.dateRange}</p>
//                                 </div>
//
//                                 <p className={'text-white/60 whitespace-pre-line'}>{selected?.review}</p>
//                             </div>
//
//                         </div>
//                     </div>
//
//
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };
//
// export default GridCardComponent;