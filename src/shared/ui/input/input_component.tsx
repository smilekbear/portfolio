import React from 'react';

type InputProps = {
    value : string
    placeholder : string
    searchIcon? : boolean
    onSearchClicked? : () => void
    onTrailingClicked? : () => void
    onChanged : (value : string) => void
}

export const InputComponent = ({value, placeholder, searchIcon = false, onSearchClicked, onChanged}: InputProps) => {
    return (
        <div className={'flex w-full items-center px-[12px] py-[4px] bg-gray-100 hover:bg-gray-200 focus-within:bg-gray-200 rounded-full gap-[1rem]'}>

            {
                searchIcon && (
                    <svg
                        className={'cursor-pointer'}
                        onClick={onSearchClicked}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 14L11.1046 11.1046M11.1046 11.1046C12.0697 10.1394 12.6667 8.80609 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667C8.80609 12.6667 10.1394 12.0697 11.1046 11.1046Z"
                            stroke="#2C3038" strokeWidth="1.2"/>
                    </svg>
                )
            }
            <input
                className={'flex flex-1 border-0 focus:outline-none focus:ring-0'}
                value={value}
                placeholder={placeholder}
                onChange={(v) => {
                    onChanged(v.target.value)
                }}
            />

        </div>
    )
}