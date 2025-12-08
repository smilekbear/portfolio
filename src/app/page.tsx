'use client';

import {useState} from "react";
import Card from "@/src/widget/card/Card";


const Page = () => {
    const [open, setOpen] = useState(false);

    const aboutItem = [
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_55)">
                    <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_8_55">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>,
            value : '김동현'
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_58)">
                    <path
                        d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
                        fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_8_58">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            ,
            value: '96.12.12'
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                       xlinkHref="http://www.w3.org/1999/xlink">
                <rect width="24" height="24" fill="url(#pattern0_8_63)"/>
                <defs>
                    <pattern id="pattern0_8_63" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_8_63" transform="scale(0.0104167)"/>
                    </pattern>
                    <image id="image0_8_63" width="96" height="96" preserveAspectRatio="none"
                           xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAER0lEQVR4nO2dXYhVVRTHf5lpOGMRGoGmmJojgkRp6EsvPRnkV5Ag9lRPPcaUiuhDqCFJD1mQYg8iSjql5UMF9RJCQUERPYSEmCkImh80CTmT444DayAuzsz9WOfutc5ZP/jDZebee9b6n8M+Z6+zzr4QBEEQBEEQBEFgj8nACqAfOAicBs4B14FhYEhen5P/HZT3rpDPBm0wBVgPnAQGgdSm/gJOAOvkO4MJeBjYBVztwPSxVHznTmBm7iQt0gvsAW6WYHyjim28BfTkTtoK64ALXTC+UX8Aa6kx9wPvZjC+UYeBadSMR4GfDZg/qp+AWdSEBcBZA6anBp0H+qg4i4ErBsxOY+gysIiKMhv43YDJaQJdBOZQwROupTE/TaAfgalUiAMGTE0t6n0qwnoDZqY2tRrnTHMy7qdxJmuuZ8x7DJiYOlRRm3LJDOBvAwYmhdqRywLebgPmJSW9iTOmlFRSTpn0p7f7CS+UZMQQcAzYKGWDHlGf/O24vKeMbbuqnJ4swYBPgPlN1ppOlLD9AZwwWW4FaiV+W+7xtsrrwIhiHDeAe3HASuUjr7+DWDYrx7IcB/QrDzud8qliPK/hgA+Vkh2S8bxTHlM8MRc1LfOcVkr2mGJMA0oxfYMDtGo/GxVj2qQUU9H8ZZ5rSsk+rhhTn+KEzDxa422vYky9SjHdwgHDBnfAA0oxFQeXeW4oJbvI4BBUNAGb5zeDJ+GXlGI6gwO+Vkr2uGJMHyvF9BUOeEcp2WFgoUI88xUvDPbigA1KySapanbKZ4rxvIgD5iomnKSq2S5blGMpelpdcEkx6RHgjTYroZrl6CInNxxSPvKSVDWbOScsVB52RlXk5IbVJRiQ5MQ8ILWdxTJZ65XXm+RqR2si6LpJa6ryXbGUWYPS3+qKjwwYl5R0FIeUNQylDHoeh0xy3hea/tcf6uJm/N3YZsDA1KG24vzB61sGTExtqihhPIJzjhgwMrWpInb3LFGekaYu6Q6wlIqg2ZuTuiSNQqAZnpQjKjnScirGFwZMTU3qcyrIE07OBSPAMiqKhyuiw1SYecA/BkxO41z3N/MMgmv2GjA6jaG3qQEPGV2w44rEVgteMWB4atDL1Ih7gO8MmD6qH6R6Wyuekue/LFx2Pk1Nec/ADthHjemRhx5y3myZTs15LuMOWJM7eSsczWB+JWr9WsyUBfO6Zf5lryuglMmqLpasXTVZdZP9XTD/g9xJWl/i7EyJ5p9Vfvaskiwrqb/zX/lRh6AJdpSwA7bnTsoTk2RZAC3zv/Xc3ZaLBR3+fMmoBpUW/aglGxR2QPGIapCpYLcvd/BV4D4Zw1s1//uqLcCdkzmyUkkrSwoUCzUFylXTkSbMv+NtiUlP7GxiBxTvCUqcH5wax/wv43q/fKYDv9zF/F+BB3MHVxfmNfQWXVNa2CNogWeklbAo3D3bygcDPV4VBUEQBEEQBEEQ4IX/AI3YiQI+zggmAAAAAElFTkSuQmCC"/>
                </defs>
            </svg>
            ,
            value: '경기도 안산시'
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                       xlinkHref="http://www.w3.org/1999/xlink">
                <rect width="24" height="24" fill="url(#pattern0_8_65)"/>
                <defs>
                    <pattern id="pattern0_8_65" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_8_65" transform="scale(0.0104167)"/>
                    </pattern>
                    <image id="image0_8_65" width="96" height="96" preserveAspectRatio="none"
                           xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACcElEQVR4nO2dTU5UQRRGv2BgbQSNYkRYkkoQF+HfTkBYACqKW8AIY495SRknBDBS3XWe90u+UQ/qnHs773WPKqlUKpVKpW/WkuwkeZfkU5LLJAzWy8Y2MW435lnkSZKzAQbMX/ZrkscR516SvQEGyT92N8lKhJnD8Gl9EeFjh5l1M5KstecnM+s3y4t5Z4Bh0alPI8j7AQZFp76JIKcDDIpOnf4nDJ+LAQZFp05uw4eZd/gse0DUAtwCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj59QLI+fUCyPn1Asj5bxSwd/gse0DUAubd4bOoQRwkeZlkP8lhLeBPeg/gPMn6FedutM9qAZ27fs3Z92sB/R87N+VDLaBf925x/vReqAUscQH7tYB+PbzF+Uf/+wJ+dB7AxjVnP+h89uQ2fD53HsJ5+7Vz1fC/dz5bcY3V285DoPWoPe9fJTle0JmvI8j2gobBEroVQVaTfBlgWNxxzyyXeabdRM2M+jPJw8iyO8DguKM+izAr7SZq+zf/ufVK89/ZlL4TTpM8ykyy2i5Dnu7j/TjojasXSU7aT82txlypVCqVSnrlF8eL35wAn/74AAAAAElFTkSuQmCC"/>
                </defs>
            </svg>,
            value: '010-3047-7605'
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                       xlinkHref="http://www.w3.org/1999/xlink">
                <rect width="24" height="24" fill="url(#pattern0_8_68)"/>
                <defs>
                    <pattern id="pattern0_8_68" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_8_68" transform="scale(0.0104167)"/>
                    </pattern>
                    <image id="image0_8_68" width="96" height="96" preserveAspectRatio="none"
                           xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEoUlEQVR4nO2dS4hWZRjHf06ZlE2peasWqaELixaGdBNS7IYENQ4TQXYHFy1qE7RMXEgFXSTCWgWRXaYoC6lgJhJ14aKNCdLFrKxWORZdyMp844Hng+ljZt7n6HfOeznvD57N8A3n/3+f75z/+75zzhlIkxnAELAX+BTYCJwTWlQbWAI8AfwEuK76Bdiqnyn0kD7gBmAYODHBwHfXv8CIniFnhBafMucDjwBfGwZ9spLffQyYG9pMSlwJvAT8cRoD313H9QxaFdpcCqHqaq4S2sZQdTVXa0O7aqi6mqs1od2LUHU1V5ahXUeoupor+dBuMlRdzZVUaIcMVdfW0I4tVF1bQjuFUHU5hnaKoepSD+2cQtWlFNo5h6qLNbTbFqoultAuoUqY0C6hStjQLg0gaP3vEiTpfTACUa5FVUKYyBowHplCPQUcjUCoS6xk6v7k6TageyE2EoExl9hCrCcNGE8JbSad1Vw3wXj1vAEdLgAejcC8C1wyBnOmGKfaGmA9QO7lozSA0oCsy0dpAKUBWZeP0gBKA7IuH6UBlAZkXT5KAygNyLp8lAZQGpB1JdGAI8Ag0E/89AMDwOe5NOCIZ7s2VkTz9zk0QL75qTKUQwNSuOxMxnk5NCB1XOz+oheYu7/oBebsb07sAnuAz1+wGd7ZwJ7SAPYBM0MIGzaIa0MDHPB606LWG4W1pQEOuL0pQWfq6tYiagfps8Po9bumHlu91SDmELCWfFirnny+1zUh5g2PCNnEmkV+zAa+8Hh/rQkh33hE3Ea+DBieAaud4x4ROX77x58FU3n/kwb43SNiAfmy0OP9tyZEHPaIuIN8udMw+QgewnIdnEd+zDPkXyMhfI9hOibrhAeA+aTPfPViWftsaEKQPC/2o3FxIjUGjOrTl6nQp5rHKvj8ATirKYEbKgjr1I2kw02n4E/yoVFerShQNu9SYbiit1dCiJTTbWcFkf8Ai4ifxarV6ut9YHoosbIx9yxw0ij2OeJnq9GLeH4m9HvjOqwGDhhE/xr5Snm2LqZ8Pj4DrifCmYMlnDcRL5sN+sXjNCLmQ48B2UtaRnxcqns5U2n/gAS4xvAt+oj42GnQncyrjD82mBkgHgYNemVhlgxrDIbGInkNsFx6jhn0Rhe6Pt4xmNof6pYOZabOaHw63yZBLgJ+Nt7S0RdAnxzzTYM+8XAhibLRYNAB23VR1xSyeHrZqO1BEmaahpfF6Hu609rEFspbRk27Yp/zW1hUYVt3VC9ddXGxcYbWeefbJWTCLfoKX4vxozU9VTNU4YtwIrHtcxMPG807LdkSvrwHx71CZzFVjv0QmWJ5jaPr2nF8V1fXVa7F8tlr9bZC605tp7aQOU9XHBCn9S2wDbgLWKEvwJ6uNVff5igbZS/qfZqncgx5R2orsOw6ugZLzpLHaRn3An9FMPiyO3s3LWUF8GXAwZf7fK6m5fQDL1SYpvai5FjPA+eGNh8TVzX0T4J2AytDm42ZdcAnNYSsrIBvDm0uJS7TdYPlyZTJ6iv9L1DLQ5tJnWXA/TrHH9GBlT+i/K11TH82omuF+4CloUUXCoVCoVAoFAqFAhPwHyPdtYwLZaZVAAAAAElFTkSuQmCC"/>
                </defs>
            </svg>,
            value: '건국대학교 글로컬캠퍼스'
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_69)">
                    <path
                        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z"
                        fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_8_69">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>,
            value: 'smilekbear@gmail.com'
        }
    ]

    const skillList =[
        {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1812_31495" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1812_31495)">
                    <path d="M9.6 15.6L11 14.175L8.825 12L11 9.825L9.6 8.4L6 12L9.6 15.6ZM14.4 15.6L18 12L14.4 8.4L13 9.825L15.175 12L13 14.175L14.4 15.6ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z" fill="#1C1B1F"/>
                </g>
            </svg>
            ,category:'Language',item:['Java','Kotlin','TypeScript','Dart']},
        {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1812_31501" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1812_31501)">
                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.5C3 6.26667 3.0375 6.04583 3.1125 5.8375C3.1875 5.62917 3.3 5.43333 3.45 5.25L4.85 3.55C5 3.36667 5.17083 3.22917 5.3625 3.1375C5.55417 3.04583 5.76667 3 6 3H18C18.2333 3 18.4458 3.04583 18.6375 3.1375C18.8292 3.22917 19 3.36667 19.15 3.55L20.55 5.25C20.7 5.43333 20.8125 5.62917 20.8875 5.8375C20.9625 6.04583 21 6.26667 21 6.5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6ZM14.55 17.05L18.1 13.5L14.55 9.95L13.1 11.4L15.2 13.5L13.1 15.6L14.55 17.05ZM9.5 17.05L10.95 15.6L8.85 13.5L10.95 11.4L9.5 9.95L5.95 13.5L9.5 17.05Z" fill="#1C1B1F"/>
                </g>
            </svg>
            ,category:'Framework',item:['Android','React','Flutter','SpringBoot','Zustand', 'Firebase']},
        {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1812_31507" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1812_31507)">
                    <path d="M6.5 20C4.98333 20 3.6875 19.475 2.6125 18.425C1.5375 17.375 1 16.0917 1 14.575C1 13.275 1.39167 12.1167 2.175 11.1C2.95833 10.0833 3.98333 9.43333 5.25 9.15C5.66667 7.61667 6.5 6.375 7.75 5.425C9 4.475 10.4167 4 12 4C13.95 4 15.6042 4.67917 16.9625 6.0375C18.3208 7.39583 19 9.05 19 11C20.15 11.1333 21.1042 11.6292 21.8625 12.4875C22.6208 13.3458 23 14.35 23 15.5C23 16.75 22.5625 17.8125 21.6875 18.6875C20.8125 19.5625 19.75 20 18.5 20H6.5Z" fill="#1C1B1F"/>
                </g>
            </svg>
            ,category:'Cloud',item:['AWS-EC2','AWS-Bucket', 'Oracle']},
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1812_31513" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1812_31513)">
                    <path
                        d="M12 22.5C11.1667 22.5 10.4583 22.2083 9.875 21.625C9.29167 21.0417 9 20.3333 9 19.5C9 18.6667 9.29167 17.9583 9.875 17.375C10.4583 16.7917 11.1667 16.5 12 16.5C12.8333 16.5 13.5417 16.7917 14.125 17.375C14.7083 17.9583 15 18.6667 15 19.5C15 20.3333 14.7083 21.0417 14.125 21.625C13.5417 22.2083 12.8333 22.5 12 22.5ZM12 20.5C12.2833 20.5 12.5208 20.4042 12.7125 20.2125C12.9042 20.0208 13 19.7833 13 19.5C13 19.2167 12.9042 18.9792 12.7125 18.7875C12.5208 18.5958 12.2833 18.5 12 18.5C11.7167 18.5 11.4792 18.5958 11.2875 18.7875C11.0958 18.9792 11 19.2167 11 19.5C11 19.7833 11.0958 20.0208 11.2875 20.2125C11.4792 20.4042 11.7167 20.5 12 20.5ZM5.5 18.75C4.66667 18.75 3.95833 18.4583 3.375 17.875C2.79167 17.2917 2.5 16.5833 2.5 15.75C2.5 14.9167 2.79167 14.2083 3.375 13.625C3.95833 13.0417 4.66667 12.75 5.5 12.75C6.33333 12.75 7.04167 13.0417 7.625 13.625C8.20833 14.2083 8.5 14.9167 8.5 15.75C8.5 16.5833 8.20833 17.2917 7.625 17.875C7.04167 18.4583 6.33333 18.75 5.5 18.75ZM18.5 18.75C17.6667 18.75 16.9583 18.4583 16.375 17.875C15.7917 17.2917 15.5 16.5833 15.5 15.75C15.5 14.9167 15.7917 14.2083 16.375 13.625C16.9583 13.0417 17.6667 12.75 18.5 12.75C19.3333 12.75 20.0417 13.0417 20.625 13.625C21.2083 14.2083 21.5 14.9167 21.5 15.75C21.5 16.5833 21.2083 17.2917 20.625 17.875C20.0417 18.4583 19.3333 18.75 18.5 18.75ZM5.5 16.75C5.78333 16.75 6.02083 16.6542 6.2125 16.4625C6.40417 16.2708 6.5 16.0333 6.5 15.75C6.5 15.4667 6.40417 15.2292 6.2125 15.0375C6.02083 14.8458 5.78333 14.75 5.5 14.75C5.21667 14.75 4.97917 14.8458 4.7875 15.0375C4.59583 15.2292 4.5 15.4667 4.5 15.75C4.5 16.0333 4.59583 16.2708 4.7875 16.4625C4.97917 16.6542 5.21667 16.75 5.5 16.75ZM18.5 16.75C18.7833 16.75 19.0208 16.6542 19.2125 16.4625C19.4042 16.2708 19.5 16.0333 19.5 15.75C19.5 15.4667 19.4042 15.2292 19.2125 15.0375C19.0208 14.8458 18.7833 14.75 18.5 14.75C18.2167 14.75 17.9792 14.8458 17.7875 15.0375C17.5958 15.2292 17.5 15.4667 17.5 15.75C17.5 16.0333 17.5958 16.2708 17.7875 16.4625C17.9792 16.6542 18.2167 16.75 18.5 16.75ZM5.5 11.25C4.66667 11.25 3.95833 10.9583 3.375 10.375C2.79167 9.79167 2.5 9.08333 2.5 8.25C2.5 7.41667 2.79167 6.70833 3.375 6.125C3.95833 5.54167 4.66667 5.25 5.5 5.25C6.33333 5.25 7.04167 5.54167 7.625 6.125C8.20833 6.70833 8.5 7.41667 8.5 8.25C8.5 9.08333 8.20833 9.79167 7.625 10.375C7.04167 10.9583 6.33333 11.25 5.5 11.25ZM18.5 11.25C17.6667 11.25 16.9583 10.9583 16.375 10.375C15.7917 9.79167 15.5 9.08333 15.5 8.25C15.5 7.41667 15.7917 6.70833 16.375 6.125C16.9583 5.54167 17.6667 5.25 18.5 5.25C19.3333 5.25 20.0417 5.54167 20.625 6.125C21.2083 6.70833 21.5 7.41667 21.5 8.25C21.5 9.08333 21.2083 9.79167 20.625 10.375C20.0417 10.9583 19.3333 11.25 18.5 11.25ZM5.5 9.25C5.78333 9.25 6.02083 9.15417 6.2125 8.9625C6.40417 8.77083 6.5 8.53333 6.5 8.25C6.5 7.96667 6.40417 7.72917 6.2125 7.5375C6.02083 7.34583 5.78333 7.25 5.5 7.25C5.21667 7.25 4.97917 7.34583 4.7875 7.5375C4.59583 7.72917 4.5 7.96667 4.5 8.25C4.5 8.53333 4.59583 8.77083 4.7875 8.9625C4.97917 9.15417 5.21667 9.25 5.5 9.25ZM18.5 9.25C18.7833 9.25 19.0208 9.15417 19.2125 8.9625C19.4042 8.77083 19.5 8.53333 19.5 8.25C19.5 7.96667 19.4042 7.72917 19.2125 7.5375C19.0208 7.34583 18.7833 7.25 18.5 7.25C18.2167 7.25 17.9792 7.34583 17.7875 7.5375C17.5958 7.72917 17.5 7.96667 17.5 8.25C17.5 8.53333 17.5958 8.77083 17.7875 8.9625C17.9792 9.15417 18.2167 9.25 18.5 9.25ZM12 7.5C11.1667 7.5 10.4583 7.20833 9.875 6.625C9.29167 6.04167 9 5.33333 9 4.5C9 3.66667 9.29167 2.95833 9.875 2.375C10.4583 1.79167 11.1667 1.5 12 1.5C12.8333 1.5 13.5417 1.79167 14.125 2.375C14.7083 2.95833 15 3.66667 15 4.5C15 5.33333 14.7083 6.04167 14.125 6.625C13.5417 7.20833 12.8333 7.5 12 7.5ZM12 5.5C12.2833 5.5 12.5208 5.40417 12.7125 5.2125C12.9042 5.02083 13 4.78333 13 4.5C13 4.21667 12.9042 3.97917 12.7125 3.7875C12.5208 3.59583 12.2833 3.5 12 3.5C11.7167 3.5 11.4792 3.59583 11.2875 3.7875C11.0958 3.97917 11 4.21667 11 4.5C11 4.78333 11.0958 5.02083 11.2875 5.2125C11.4792 5.40417 11.7167 5.5 12 5.5Z"
                        fill="#1C1B1F"/>
                </g>
            </svg>
            , category: 'Pattern', item: ['MVVM', 'MVI', 'Flavor']
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1812_31525" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1812_31525)">
                    <path
                        d="M6 20.9997C5.25 20.9997 4.50833 20.8164 3.775 20.4497C3.04167 20.0831 2.45 19.5997 2 18.9997C2.43333 18.9997 2.875 18.8289 3.325 18.4872C3.775 18.1456 4 17.6497 4 16.9997C4 16.1664 4.29167 15.4581 4.875 14.8747C5.45833 14.2914 6.16667 13.9997 7 13.9997C7.83333 13.9997 8.54167 14.2914 9.125 14.8747C9.70833 15.4581 10 16.1664 10 16.9997C10 18.0997 9.60833 19.0414 8.825 19.8247C8.04167 20.6081 7.1 20.9997 6 20.9997ZM11.75 14.9997L9 12.2497L17.95 3.29972C18.1333 3.11639 18.3625 3.02055 18.6375 3.01222C18.9125 3.00389 19.15 3.09972 19.35 3.29972L20.7 4.64972C20.9 4.84972 21 5.08305 21 5.34972C21 5.61639 20.9 5.84972 20.7 6.04972L11.75 14.9997Z"
                        fill="#1C1B1F"/>
                </g>
            </svg>
            , category: 'Design', item: ['Figma', 'XD']
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1812_31531" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1812_31531)">
                    <path
                        d="M3.075 13C3.05833 12.8333 3.04583 12.6667 3.0375 12.5C3.02917 12.3333 3.025 12.1667 3.025 12C3.025 10.75 3.25833 9.57917 3.725 8.4875C4.19167 7.39583 4.83333 6.44583 5.65 5.6375C6.46667 4.82917 7.41667 4.1875 8.5 3.7125C9.58333 3.2375 10.75 3 12 3C13.25 3 14.4208 3.2375 15.5125 3.7125C16.6042 4.1875 17.5542 4.82917 18.3625 5.6375C19.1708 6.44583 19.8125 7.39583 20.2875 8.4875C20.7625 9.57917 21 10.75 21 12C21 12.1667 20.9958 12.3333 20.9875 12.5C20.9792 12.6667 20.9667 12.8333 20.95 13H18.925C18.9583 12.8333 18.9792 12.6667 18.9875 12.5C18.9958 12.3333 19 12.1667 19 12C19 11.8333 18.9958 11.6667 18.9875 11.5C18.9792 11.3333 18.9583 11.1667 18.925 11H15.975C15.9917 11.1667 16 11.3333 16 11.5V12.5C16 12.6667 15.9917 12.8333 15.975 13H14V12.175C14 11.975 13.9958 11.775 13.9875 11.575C13.9792 11.375 13.9667 11.1833 13.95 11H10.075C10.0583 11.1833 10.0458 11.375 10.0375 11.575C10.0292 11.775 10.025 11.975 10.025 12.175V13H8.05C8.03333 12.8333 8.025 12.6667 8.025 12.5V11.5C8.025 11.3333 8.03333 11.1667 8.05 11H5.1C5.06667 11.1667 5.04583 11.3333 5.0375 11.5C5.02917 11.6667 5.025 11.8333 5.025 12C5.025 12.1667 5.02917 12.3333 5.0375 12.5C5.04583 12.6667 5.06667 12.8333 5.1 13H3.075ZM5.7 9H8.275C8.40833 8.28333 8.575 7.6375 8.775 7.0625C8.975 6.4875 9.19167 5.96667 9.425 5.5C8.625 5.8 7.9 6.25417 7.25 6.8625C6.6 7.47083 6.08333 8.18333 5.7 9ZM10.35 9H13.65C13.4833 8.28333 13.275 7.58333 13.025 6.9C12.775 6.21667 12.4333 5.58333 12 5C11.5667 5.58333 11.2208 6.21667 10.9625 6.9C10.7042 7.58333 10.5 8.28333 10.35 9ZM15.75 9H18.325C17.9417 8.18333 17.4208 7.47083 16.7625 6.8625C16.1042 6.25417 15.375 5.8 14.575 5.5C14.8083 6 15.0292 6.52917 15.2375 7.0875C15.4458 7.64583 15.6167 8.28333 15.75 9ZM11 21V20C11 19.1667 10.7083 18.4583 10.125 17.875C9.54167 17.2917 8.83333 17 8 17H2V15H8C8.8 15 9.54583 15.175 10.2375 15.525C10.9292 15.875 11.5167 16.3667 12 17C12.4833 16.3667 13.0708 15.875 13.7625 15.525C14.4542 15.175 15.2 15 16 15H22V17H16C15.1667 17 14.4583 17.2917 13.875 17.875C13.2917 18.4583 13 19.1667 13 20V21H11Z"
                        fill="#1C1B1F"/>
                </g>
            </svg>
            , category: 'VCS', item: ['Git', 'SVN']
        },
    ]

    const projectDummyData = [
        {
            fullTitle:'F.E.S (For-Every-Silver)',
            title: 'F.E.S',
            category: '공모전',
            projectInfo : `한국은 현재 고령화 사회로 접어들면서 노년층 인구가 증가하고 있습니다. 그에 따라 만성질환 등으로 약을 복용해야 하는 사람들도 늘어나고 있지만, 많은 사람들이 바쁜 일상 속에서 약 복용 시간을 놓쳐 통증이 발생하거나, 심각한 경우 생명에 위협이 되는 사례도 발생하고 있습니다.

‘For Every Silver’(F.E.S)는 이러한 문제를 해결하고자 시작된 프로젝트입니다. 이 IoT 기반 장비는 사람들이 약을 제 시간에 복용할 수 있도록 도와주는 역할을 합니다.

F.E.S 프로젝트의 주요 기획 내용은 다음과 같습니다.

1. 사용자는 F.E.S 장비에 복용할 약을 넣습니다.
2. 모바일 앱을 통해 장비와 BLE(Bluetooth Low Energy)로 연동하고, 의사에게 처방받은 복용 시간을 예약합니다.
3. 장비는 예약된 시간에 알람을 울리고, 설정된 약을 자동으로 배출합니다.`,
            image:[],
            date: '06.2020 ~ 11.2020',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/fes.jpeg',
            skills:['Android', 'BLE','JAVA', 'Arduino', 'Python','SolidWorks'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review : `‘F.E.S’ 프로젝트는 공모전을 목표로 시작된 팀 프로젝트였습니다.
총 7명으로 구성된 팀은 기계공학부 학생 5명과 컴퓨터공학과 학생 2명(저 포함)으로 이루어졌습니다. 기계공학부 측은 프로토타입 도면 설계와 아두이노를 활용한 하드웨어 제작을 담당했고, 컴퓨터공학과 측은 Android 앱 개발과 장비 제어를 위한 프로그래밍을 맡았습니다.
            
당시 저는 프로젝트 경험이 거의 없었기에 큰 도전처럼 느껴졌습니다.
개발 역량은 Android 생명주기나 화면 전환 정도만 가능했으며, 이렇게 많은 인원이 함께하는 협업 경험도 처음이었습니다. 하지만 타 전공 친구들과 함께 기획과 설계를 진행하면서 프로젝트에 대한 소속감과 팀워크의 중요성을 체감할 수 있었습니다.

협업 과정은 매우 원활했습니다.
저는 의사소통 능력을 바탕으로 다양한 의견을 조율하고, 팀원들과 함께 현실적인 해결책을 찾아가는 데 기여했습니다. 구성원 간의 신뢰와 배려가 있었기에 프로젝트를 안정적으로 이끌 수 있었습니다.

가장 어려웠던 부분은 두 가지였습니다.
하나는 장비와의 BLE 통신이었고, 다른 하나는 모바일 앱의 핵심 기능 개발이었습니다. 부족한 기술력을 보완하기 위해 많은 자료를 찾아 공부하고, 발생하는 문제를 하나씩 해결해 나가야 했습니다. 다행히 개발을 담당한 두 명이 서로 협력하며 문제 해결을 분담할 수 있었습니다.

최종적으로 구현하고자 한 기능을 성공적으로 완성해냈고,
그 과정에서 저는 처음으로 ‘개발’이라는 일에 대해 진정한 성취감과 즐거움을 느꼈습니다. 이 프로젝트는 저에게 도전이자 성장의 기회였으며, 이후 개발자로서의 길을 선택하게 만든 결정적인 계기가 되었습니다.`,

        },
        {
            fullTitle:'',
            title: '스마트 삼각대',
            category: '졸업작품',
            projectInfo: '',
            image:[],
            date: '01.2020 ~ 12.2020',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/smart_tripod.jpeg',
            skills:['Android', 'BLE', 'Wifi-direct'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review:''
        },

        {
            fullTitle:'',
            title: 'LiveScore',
            category: "Psynet",
            projectInfo: '',
            image:[],
            date: '01.2021 ~ 04.2023',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/premium.png',
            skills:['Android', 'Java', 'Kotlin','MVC'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review:''
        },
        {
            fullTitle:'',
            title: 'HEC',
            category: 'MotrexEv',
            projectInfo: '',
            image:[],
            date: '05.2023 ~ 12.2023',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/charger.png',
            skills:['Android', 'JAVA','MVVM','OCPP'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review:''
        },
        {
            fullTitle:'',
            title: 'MusicTree',
            category: '외주',
            projectInfo: '',
            image:[],
            date: '03.2024 ~ 06.2024',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/music_tree.png',
            skills:['Android', 'MIDI', 'FIGMA'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review:''
        },
        {
            fullTitle:'O.MU(오늘 점심 무엇?)',
            title: 'O.MU',
            category: '외주',
            projectInfo : `‘O.MU’는 내 주변 맛집을 추천해주는 모바일 플랫폼입니다.
특히 점심 메뉴 선택에 고민이 많은 직장인들을 주요 타겟으로 기획되었습니다.
사용자는 인스타그램처럼 구성된 피드에서 맛집 정보를 확인하고, 서로 추천도 주고받을 수 있습니다.`,
            image:[],
            date: '06.2024 ~ 12.2024',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/omu.png',
            skills:['Flutter','Dart','Figma','AWS','Spring','Firebase(FCM)','SocialLogin'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review : `이 프로젝트는 1년 차 클라이언트 개발자와 저, 총 2명이서 진행했습니다.
클라이언트 개발자는 Flutter를 이용해 Android와 iOS 앱 개발을 맡았고, 저는 AWS EC2 서버 위에서 SpringBoot로 API 서버를 구축하고, React로 관리자 페이지를 개발했습니다. 프로젝트의 전체 설계와 일정 조율, 커뮤니케이션 등도 제가 총괄했습니다. 디자인은 외주 업체로부터 Figma 파일로 전달받아 개발에 활용했습니다.
            
초기 계약 기간은 4개월이었지만, 실제 필요한 기간은 6개월이었습니다.
디자인이 완료된 상태였고, 클라이언트-서버 간 흐름도 어느 정도 파악하고 있었기에 4개월이면 충분할 거라 판단했지만, 실제 개발은 예상보다 복잡했습니다. 특히 시나리오와 디자인 간의 불일치로 인해 추가 작업이 발생했고, 앱, 서버, 관리자 페이지를 모두 병행해야 했습니다.

개발 도중 디자인 외주 계약이 끝나버려, 일부 화면은 제가 직접 UI를 그리고 시나리오를 작성했습니다.
이 과정에서 프로젝트 전체 흐름을 이해하고 통제할 수 있게 되었고, 실무에서의 문제 해결력과 유연함을 키울 수 있었습니다. 회의 주도, 기획 보완, 일정 관리까지 맡으며 다양한 역할을 경험했습니다.

고객사의 추가 요구사항이 중간에 들어오면서 개발 기간은 2개월 연장되었습니다.
그러나 클라이언트 개발자와 협력하여 기능들을 순차적으로 완성해 나갔고, 최종적으로 고객이 원하는 수준의 결과물을 만들어 낼 수 있었습니다.


이 프로젝트를 통해 저는 단순한 개발을 넘어, 기획-설계-커뮤니케이션-리스크 대응까지 포함된 전체 프로젝트 운영 경험을 쌓을 수 있었습니다.
무엇보다 도전적인 상황 속에서 주도적으로 문제를 해결하며 성장하는 저 자신을 확인할 수 있었고, 개발이라는 일에 대한 확신과 즐거움을 다시 느낄 수 있었습니다.`,
        },
        {
            fullTitle:'',
            title: '시운전 모바일 앱',
            category: 'MotrexEv',
            projectInfo: '',
            image:[],
            date: '01.2025 ~ 03.2025',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/pilot_app.png',
            skills:['Flutter','Dart','Figma','RestAPI'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review:''
        },
        {
            fullTitle:'',
            title: '관리자 페이지',
            category: 'MotrexEv',
            projectInfo: '',
            image:[],
            date: '04.2025 ~ ',
            thumbnail: 'https://smilekbear.s3.ap-northeast-2.amazonaws.com/admin_site.png',
            skills:['React', 'TS','Figma','Zustand'],
            avatars: ['https://i.pravatar.cc/24?img=1'],
            votes: 21,
            review : `
클라이언트 개발자는 Flutter를 이용해 Android와 iOS 앱 개발을 맡았고, 저는 AWS EC2 서버 위에서 SpringBoot로 API 서버를 구축하고, React로 관리자 페이지를 개발했습니다. 프로젝트의 전체 설계와 일정 조율, 커뮤니케이션 등도 제가 총괄했습니다. 디자인은 외주 업체로부터 Figma 파일로 전달받아 개발에 활용했습니다.
            
초기 계약 기간은 4개월이었지만, 실제 필요한 기간은 6개월이었습니다.
디자인이 완료된 상태였고, 클라이언트-서버 간 흐름도 어느 정도 파악하고 있었기에 4개월이면 충분할 거라 판단했지만, 실제 개발은 예상보다 복잡했습니다. 특히 시나리오와 디자인 간의 불일치로 인해 추가 작업이 발생했고, 앱, 서버, 관리자 페이지를 모두 병행해야 했습니다.

개발 도중 디자인 외주 계약이 끝나버려, 일부 화면은 제가 직접 UI를 그리고 시나리오를 작성했습니다.
이 과정에서 프로젝트 전체 흐름을 이해하고 통제할 수 있게 되었고, 실무에서의 문제 해결력과 유연함을 키울 수 있었습니다. 회의 주도, 기획 보완, 일정 관리까지 맡으며 다양한 역할을 경험했습니다.

고객사의 추가 요구사항이 중간에 들어오면서 개발 기간은 2개월 연장되었습니다.
그러나 클라이언트 개발자와 협력하여 기능들을 순차적으로 완성해 나갔고, 최종적으로 고객이 원하는 수준의 결과물을 만들어 낼 수 있었습니다.


이 프로젝트를 통해 저는 단순한 개발을 넘어, 기획-설계-커뮤니케이션-리스크 대응까지 포함된 전체 프로젝트 운영 경험을 쌓을 수 있었습니다.
무엇보다 도전적인 상황 속에서 주도적으로 문제를 해결하며 성장하는 저 자신을 확인할 수 있었고, 개발이라는 일에 대한 확신과 즐거움을 다시 느낄 수 있었습니다.`,
        },

    ];

    const careerListDummyData = [
        {
            period:'01.2021 ~ 04.2023',
            title:'(주)사이넷',
            subTitle: '#LiveScore - Android 개발 업무',
            works:['AndroidStudio(IDE)를 활용한 LiveScore 모바일 앱 개발 작업','MVC 패턴을 활용해 UI Layer의 의존성 결합도 관리','기획자, 디자이너와의 신규 서비스에 대한 지속적인 커뮤니케이션','Android OS 신규 버전 업데이트에 따른 어플리케이션 라이브러리 대응','실 사용자들에게 발생하는 Error를 Firebase - CrashLyrics 기능을 통해 확인 후 즉각적인 대응'],
            skills: [<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1845_31431" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36"
                      height="36">
                    <rect width="36" height="36" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1845_31431)">
                    <path
                        d="M1.5 26.9988C1.725 24.3238 2.54375 21.8613 3.95625 19.6113C5.36875 17.3613 7.25 15.5738 9.6 14.2488L6.825 9.44883C6.675 9.22383 6.6375 8.98633 6.7125 8.73633C6.7875 8.48633 6.95 8.29883 7.2 8.17383C7.4 8.04883 7.625 8.02383 7.875 8.09883C8.125 8.17383 8.325 8.32383 8.475 8.54883L11.25 13.3488C13.4 12.4488 15.65 11.9988 18 11.9988C20.35 11.9988 22.6 12.4488 24.75 13.3488L27.525 8.54883C27.675 8.32383 27.875 8.17383 28.125 8.09883C28.375 8.02383 28.6 8.04883 28.8 8.17383C29.05 8.29883 29.2125 8.48633 29.2875 8.73633C29.3625 8.98633 29.325 9.22383 29.175 9.44883L26.4 14.2488C28.75 15.5738 30.6313 17.3613 32.0438 19.6113C33.4563 21.8613 34.275 24.3238 34.5 26.9988H1.5ZM10.5 22.8738C11.025 22.8738 11.4688 22.6926 11.8313 22.3301C12.1938 21.9676 12.375 21.5238 12.375 20.9988C12.375 20.4738 12.1938 20.0301 11.8313 19.6676C11.4688 19.3051 11.025 19.1238 10.5 19.1238C9.975 19.1238 9.53125 19.3051 9.16875 19.6676C8.80625 20.0301 8.625 20.4738 8.625 20.9988C8.625 21.5238 8.80625 21.9676 9.16875 22.3301C9.53125 22.6926 9.975 22.8738 10.5 22.8738ZM25.5 22.8738C26.025 22.8738 26.4688 22.6926 26.8313 22.3301C27.1938 21.9676 27.375 21.5238 27.375 20.9988C27.375 20.4738 27.1938 20.0301 26.8313 19.6676C26.4688 19.3051 26.025 19.1238 25.5 19.1238C24.975 19.1238 24.5313 19.3051 24.1688 19.6676C23.8063 20.0301 23.625 20.4738 23.625 20.9988C23.625 21.5238 23.8063 21.9676 24.1688 22.3301C24.5313 22.6926 24.975 22.8738 25.5 22.8738Z"
                        fill="#A4C639"/>
                </g>
            </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1845_31479)">
                        <path
                            d="M19.2656 16.5234C20.5313 18 18.9141 19.3359 18.9141 19.3359C18.9141 19.3359 22.2188 17.6484 20.6719 15.5391C19.125 13.4297 18.211 12.5859 24.0469 9.21094C24.0469 9.14062 14.836 11.4609 19.2656 16.5234ZM20.6719 3.72656C20.6719 3.72656 23.4844 6.53906 18 10.7578C13.6406 14.2031 17.0156 16.1719 18 18.4219C15.4688 16.1016 13.5703 14.1328 14.836 12.2344C16.7344 9.42188 21.7969 8.08594 20.6719 3.72656Z"
                            fill="#F8981D"/>
                        <path
                            d="M14.4845 24.3977C14.4845 24.3977 13.4298 24.9602 15.1876 25.1711C16.9454 25.3821 18.422 25.3821 20.7423 24.9602C21.2137 25.236 21.7076 25.4712 22.2189 25.6633C17.0157 27.9133 10.3361 25.593 14.4845 24.3977ZM13.8517 21.4446C13.8517 21.4446 12.7267 22.2883 14.4845 22.4992C16.2423 22.7102 18.5626 22.7805 21.6564 22.1477C21.9775 22.4589 22.3609 22.6986 22.7814 22.8508C16.3829 24.6789 9.28137 22.9914 13.8517 21.4446ZM26.1564 26.5774C26.1564 26.5774 26.9298 27.2102 25.3126 27.7024C22.2892 28.6164 12.7267 28.8977 10.0548 27.7727C9.07044 27.3508 11.1095 26.5774 12.3751 26.5774C11.1798 25.8742 5.4845 28.0539 9.422 28.6867C20.1798 30.3742 28.9689 27.843 26.1564 26.5774ZM14.9767 18.4211C14.9767 18.4211 10.1251 19.5461 13.2189 19.968C14.5548 20.1789 17.2267 20.1086 19.6876 19.8977C22.1486 19.6867 23.6954 19.3352 23.6954 19.3352C23.281 19.5143 22.8813 19.7259 22.5001 19.968C17.5782 21.2336 8.01575 20.6711 10.7579 19.3352C13.5001 17.9992 14.9767 18.4211 14.9767 18.4211ZM23.6954 23.2727C28.8282 20.6711 26.4376 17.6477 24.1876 18.6321C26.7189 16.5227 31.2892 21.1633 23.5548 23.4133V23.2727M15.4689 30.3742C20.3204 30.6555 27.7032 30.2336 27.8439 27.9133C27.8439 27.9133 27.4923 28.7571 23.8361 29.4602C20.1798 30.1633 14.6251 30.1633 11.6017 29.6711C11.672 29.6711 12.3048 30.1633 15.4689 30.3742Z"
                            fill="#5382A1"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1845_31479">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1846_31487)">
                        <path d="M36 36H0V0H36L18 18L36 36Z" fill="url(#paint0_linear_1846_31487)"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_1846_31487" x1="36" y1="-1.07288e-06" x2="1.07288e-06" y2="36"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="0.00343514" stopColor="#E44857"/>
                            <stop offset="0.4689" stopColor="#C711E1"/>
                            <stop offset="1" stopColor="#7F52FF"/>
                        </linearGradient>
                        <clipPath id="clip0_1846_31487">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1845_31483)">
                        <path
                            d="M29.6247 0H6.37526C2.8543 0 0 2.92748 0 6.53871V29.4613C0 33.0725 2.8543 36 6.37526 36H29.6247C33.1457 36 36 33.0725 36 29.4613V6.53871C36 2.92748 33.1457 0 29.6247 0Z"
                            fill="#470137"/>
                        <path
                            d="M18.9247 9.46682L14.4329 17.0705L19.2388 25.1453C19.2697 25.2018 19.2782 25.2684 19.2626 25.3312C19.2465 25.3888 19.1924 25.3528 19.094 25.3687H15.6658C15.4241 25.3687 15.2555 25.36 15.1586 25.195C14.8368 24.5509 14.5149 23.9111 14.1926 23.2756C13.8704 22.6401 13.5283 21.9916 13.1663 21.3302C12.8047 20.6702 12.4467 20.0013 12.0922 19.3235H12.0676C11.7453 19.9845 11.4112 20.6452 11.0651 21.3057C10.719 21.9661 10.3769 22.6225 10.0387 23.2748C9.70058 23.9267 9.35448 24.5751 9.00042 25.2202C8.93579 25.3687 8.82338 25.3845 8.66251 25.3845H5.35229C5.28837 25.3845 5.25254 25.4105 5.24411 25.3442C5.23494 25.2837 5.24769 25.222 5.27994 25.1705L9.94107 17.3169L5.40077 9.4416C5.35229 9.37603 5.34457 9.32199 5.37688 9.28092C5.39481 9.26015 5.41725 9.24398 5.44238 9.23371C5.46752 9.22345 5.49465 9.21938 5.5216 9.22184H8.92665C9.00098 9.21776 9.07529 9.2303 9.14443 9.25859C9.20201 9.2926 9.25145 9.33937 9.28915 9.39549C9.57858 10.0555 9.90056 10.716 10.2551 11.3769C10.6096 12.0379 10.9679 12.6885 11.3299 13.3288C11.6915 13.9729 12.0254 14.6253 12.3317 15.2857H12.3563C12.678 14.6089 13.004 13.9484 13.3342 13.3043C13.6644 12.6602 14.0025 12.0117 14.3486 11.3589C14.6942 10.7066 15.0282 10.0581 15.3504 9.4135C15.3692 9.3523 15.4025 9.29684 15.4473 9.2521C15.5069 9.22102 15.574 9.20826 15.6405 9.21536H18.8018C18.8318 9.20959 18.8628 9.214 18.8902 9.22793C18.9175 9.24186 18.9397 9.26454 18.9534 9.29255C18.967 9.32056 18.9714 9.35236 18.9659 9.38316C18.9603 9.41395 18.9451 9.44206 18.9226 9.46322L18.9247 9.46682Z"
                            fill="#FF61F6"/>
                        <path
                            d="M25.8562 25.6905C24.7445 25.708 23.643 25.4712 22.6317 24.9974C21.6899 24.5499 20.9024 23.8201 20.3731 22.9043C19.8261 21.9715 19.5524 20.8033 19.5519 19.3997C19.5441 18.2638 19.8272 17.1457 20.3731 16.1574C20.936 15.1506 21.7637 14.3266 22.7617 13.7796C23.8075 13.1855 25.072 12.8884 26.5552 12.8884C26.6353 12.8884 26.74 12.8884 26.8692 12.9006C26.9985 12.9129 27.1502 12.9215 27.328 12.9374V8.05512C27.328 7.93984 27.3764 7.8822 27.4727 7.8822H30.5152C30.5489 7.87725 30.583 7.88614 30.6103 7.90692C30.6375 7.92771 30.6556 7.95872 30.6607 7.99316C30.6621 8.00561 30.6621 8.01818 30.6607 8.03063V22.6687C30.6607 22.9497 30.6726 23.2552 30.6965 23.5852C30.7204 23.9152 30.7405 24.2125 30.7569 24.4772C30.7599 24.5286 30.7476 24.5798 30.7218 24.624C30.696 24.6682 30.6578 24.7034 30.6122 24.725C29.8271 25.0607 29.0095 25.3097 28.1731 25.4679C27.4088 25.6125 26.6334 25.687 25.8562 25.6905ZM27.3315 22.6197V15.8576C27.201 15.8218 27.0677 15.7977 26.9332 15.7856C26.7686 15.7685 26.6033 15.7601 26.4379 15.7604C25.8517 15.7545 25.2725 15.8902 24.747 16.1566C24.2363 16.4179 23.8006 16.8107 23.4824 17.2965C23.1523 17.7917 22.9872 18.4438 22.9872 19.2527C22.9754 19.7926 23.0614 20.3301 23.2408 20.8378C23.3868 21.247 23.6173 21.6188 23.9166 21.928C24.2036 22.212 24.5508 22.4241 24.931 22.5476C25.3329 22.6808 25.7529 22.7474 26.1752 22.7451C26.4 22.7451 26.6091 22.7369 26.8025 22.7206C26.9806 22.7057 27.1567 22.6719 27.328 22.6197H27.3315Z"
                            fill="#FF61F6"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1845_31483">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.835 33.6306C14.2298 34.192 15.7431 34.5251 17.3321 34.5806C19.4825 34.6557 21.5274 34.2111 23.3555 33.3666C21.1633 32.5053 19.1779 31.2457 17.4834 29.6797C16.385 31.4383 14.7605 32.8274 12.835 33.6306Z"
                        fill="#FF9100"/>
                    <path
                        d="M17.4832 29.6788C13.6153 26.1014 11.2688 20.9237 11.4671 15.2447C11.4736 15.0603 11.4833 14.876 11.4947 14.6917C10.8019 14.5126 10.0787 14.4032 9.33447 14.3773C8.26917 14.3401 7.23747 14.4722 6.26349 14.7464C5.23093 16.5551 4.60784 18.6304 4.53021 20.8533C4.32988 26.59 7.80153 31.6025 12.8347 33.6296C14.7603 32.8264 16.3848 31.439 17.4832 29.6788Z"
                        fill="#FFC400"/>
                    <path
                        d="M17.4834 29.6784C18.3826 28.2393 18.9279 26.5521 18.9913 24.7343C19.1583 19.9526 15.9438 15.8392 11.4948 14.6914C11.4834 14.8757 11.4737 15.06 11.4672 15.2444C11.2689 20.9234 13.6154 26.1011 17.4834 29.6784Z"
                        fill="#FF9100"/>
                    <path
                        d="M18.4938 1.25195C15.9599 3.2819 13.959 5.95857 12.7484 9.04203C12.0554 10.8082 11.6198 12.7053 11.4927 14.694C15.9417 15.8418 19.1562 19.9552 18.9893 24.7368C18.9258 26.5546 18.3789 28.2402 17.4812 29.6811C19.1756 31.2487 21.1611 32.5066 23.3533 33.3679C27.7535 31.3339 30.8755 26.9571 31.0563 21.7803C31.1734 18.4262 29.8847 15.4368 28.0638 12.9136C26.1407 10.245 18.4938 1.25195 18.4938 1.25195Z"
                        fill="#DD2C00"/>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1846_31523)">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.9464 0C8.02249 0 0 8.25 0 18.4564C0 26.6149 5.14029 33.5209 12.2712 35.9651C13.1628 36.1489 13.4893 35.568 13.4893 35.0794C13.4893 34.6515 13.46 33.1849 13.46 31.6567C8.46771 32.757 7.42812 29.4566 7.42812 29.4566C6.62584 27.3176 5.4371 26.7679 5.4371 26.7679C3.80314 25.6372 5.55612 25.6372 5.55612 25.6372C7.36861 25.7595 8.31967 27.5317 8.31967 27.5317C9.92388 30.3427 12.5089 29.5485 13.5489 29.0595C13.6973 27.8677 14.173 27.0427 14.6781 26.5845C10.6964 26.1566 6.50718 24.5678 6.50718 17.4784C6.50718 15.4616 7.21984 13.8116 8.34906 12.5284C8.1709 12.0701 7.54678 10.1753 8.52759 7.63913C8.52759 7.63913 10.0429 7.15013 13.4596 9.53363C14.9224 9.12962 16.431 8.92411 17.9464 8.92237C19.4617 8.92237 21.0064 9.1365 22.4328 9.53363C25.8498 7.15013 27.3651 7.63913 27.3651 7.63913C28.346 10.1753 27.7215 12.0701 27.5433 12.5284C28.7023 13.8116 29.3856 15.4616 29.3856 17.4784C29.3856 24.5678 25.1963 26.1259 21.1849 26.5845C21.8388 27.165 22.403 28.2649 22.403 30.0067C22.403 32.4817 22.3736 34.4681 22.3736 35.079C22.3736 35.568 22.7006 36.1489 23.5918 35.9655C30.7227 33.5205 35.863 26.6149 35.863 18.4564C35.8924 8.25 27.8405 0 17.9464 0Z"
                              fill="#24292F"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1846_31523">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            ]
        },
        {
            period: '05.2023 ~ current',
            title: '모트렉스EV(주)',
            subTitle: '#S/W 연구 개발',
            works: ['HEC(Hyundai Engineering Charger) 완속 충전기에 탑재된 Android App 개발', '국내 설치된 HEC 충전기에서 발생하는 Issue 즉각적인 수정 및 빠른 대응', 'MQTT 프로토콜 통신 기능을 개발하여 원격으로 충전기를 제어할 수 있도록 개발', '충전기 설치 시운전 작업에 필요한 모바일 App 기획, 디자인 및 개발 총괄하여 진행', 'CPO 사들이 충전기 결제 내역을 관리할 수 있는 관리자 페이지 개발'],
            skills: [<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1845_31431" mask="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36"
                      height="36">
                    <rect width="36" height="36" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1845_31431)">
                    <path
                        d="M1.5 26.9988C1.725 24.3238 2.54375 21.8613 3.95625 19.6113C5.36875 17.3613 7.25 15.5738 9.6 14.2488L6.825 9.44883C6.675 9.22383 6.6375 8.98633 6.7125 8.73633C6.7875 8.48633 6.95 8.29883 7.2 8.17383C7.4 8.04883 7.625 8.02383 7.875 8.09883C8.125 8.17383 8.325 8.32383 8.475 8.54883L11.25 13.3488C13.4 12.4488 15.65 11.9988 18 11.9988C20.35 11.9988 22.6 12.4488 24.75 13.3488L27.525 8.54883C27.675 8.32383 27.875 8.17383 28.125 8.09883C28.375 8.02383 28.6 8.04883 28.8 8.17383C29.05 8.29883 29.2125 8.48633 29.2875 8.73633C29.3625 8.98633 29.325 9.22383 29.175 9.44883L26.4 14.2488C28.75 15.5738 30.6313 17.3613 32.0438 19.6113C33.4563 21.8613 34.275 24.3238 34.5 26.9988H1.5ZM10.5 22.8738C11.025 22.8738 11.4688 22.6926 11.8313 22.3301C12.1938 21.9676 12.375 21.5238 12.375 20.9988C12.375 20.4738 12.1938 20.0301 11.8313 19.6676C11.4688 19.3051 11.025 19.1238 10.5 19.1238C9.975 19.1238 9.53125 19.3051 9.16875 19.6676C8.80625 20.0301 8.625 20.4738 8.625 20.9988C8.625 21.5238 8.80625 21.9676 9.16875 22.3301C9.53125 22.6926 9.975 22.8738 10.5 22.8738ZM25.5 22.8738C26.025 22.8738 26.4688 22.6926 26.8313 22.3301C27.1938 21.9676 27.375 21.5238 27.375 20.9988C27.375 20.4738 27.1938 20.0301 26.8313 19.6676C26.4688 19.3051 26.025 19.1238 25.5 19.1238C24.975 19.1238 24.5313 19.3051 24.1688 19.6676C23.8063 20.0301 23.625 20.4738 23.625 20.9988C23.625 21.5238 23.8063 21.9676 24.1688 22.3301C24.5313 22.6926 24.975 22.8738 25.5 22.8738Z"
                        fill="#A4C639"/>
                </g>
            </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1845_31479)">
                        <path
                            d="M19.2656 16.5234C20.5313 18 18.9141 19.3359 18.9141 19.3359C18.9141 19.3359 22.2188 17.6484 20.6719 15.5391C19.125 13.4297 18.211 12.5859 24.0469 9.21094C24.0469 9.14062 14.836 11.4609 19.2656 16.5234ZM20.6719 3.72656C20.6719 3.72656 23.4844 6.53906 18 10.7578C13.6406 14.2031 17.0156 16.1719 18 18.4219C15.4688 16.1016 13.5703 14.1328 14.836 12.2344C16.7344 9.42188 21.7969 8.08594 20.6719 3.72656Z"
                            fill="#F8981D"/>
                        <path
                            d="M14.4845 24.3977C14.4845 24.3977 13.4298 24.9602 15.1876 25.1711C16.9454 25.3821 18.422 25.3821 20.7423 24.9602C21.2137 25.236 21.7076 25.4712 22.2189 25.6633C17.0157 27.9133 10.3361 25.593 14.4845 24.3977ZM13.8517 21.4446C13.8517 21.4446 12.7267 22.2883 14.4845 22.4992C16.2423 22.7102 18.5626 22.7805 21.6564 22.1477C21.9775 22.4589 22.3609 22.6986 22.7814 22.8508C16.3829 24.6789 9.28137 22.9914 13.8517 21.4446ZM26.1564 26.5774C26.1564 26.5774 26.9298 27.2102 25.3126 27.7024C22.2892 28.6164 12.7267 28.8977 10.0548 27.7727C9.07044 27.3508 11.1095 26.5774 12.3751 26.5774C11.1798 25.8742 5.4845 28.0539 9.422 28.6867C20.1798 30.3742 28.9689 27.843 26.1564 26.5774ZM14.9767 18.4211C14.9767 18.4211 10.1251 19.5461 13.2189 19.968C14.5548 20.1789 17.2267 20.1086 19.6876 19.8977C22.1486 19.6867 23.6954 19.3352 23.6954 19.3352C23.281 19.5143 22.8813 19.7259 22.5001 19.968C17.5782 21.2336 8.01575 20.6711 10.7579 19.3352C13.5001 17.9992 14.9767 18.4211 14.9767 18.4211ZM23.6954 23.2727C28.8282 20.6711 26.4376 17.6477 24.1876 18.6321C26.7189 16.5227 31.2892 21.1633 23.5548 23.4133V23.2727M15.4689 30.3742C20.3204 30.6555 27.7032 30.2336 27.8439 27.9133C27.8439 27.9133 27.4923 28.7571 23.8361 29.4602C20.1798 30.1633 14.6251 30.1633 11.6017 29.6711C11.672 29.6711 12.3048 30.1633 15.4689 30.3742Z"
                            fill="#5382A1"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1845_31479">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.835 33.6306C14.2298 34.192 15.7431 34.5251 17.3321 34.5806C19.4825 34.6557 21.5274 34.2111 23.3555 33.3666C21.1633 32.5053 19.1779 31.2457 17.4834 29.6797C16.385 31.4383 14.7605 32.8274 12.835 33.6306Z"
                        fill="#FF9100"/>
                    <path
                        d="M17.4832 29.6788C13.6153 26.1014 11.2688 20.9237 11.4671 15.2447C11.4736 15.0603 11.4833 14.876 11.4947 14.6917C10.8019 14.5126 10.0787 14.4032 9.33447 14.3773C8.26917 14.3401 7.23747 14.4722 6.26349 14.7464C5.23093 16.5551 4.60784 18.6304 4.53021 20.8533C4.32988 26.59 7.80153 31.6025 12.8347 33.6296C14.7603 32.8264 16.3848 31.439 17.4832 29.6788Z"
                        fill="#FFC400"/>
                    <path
                        d="M17.4834 29.6784C18.3826 28.2393 18.9279 26.5521 18.9913 24.7343C19.1583 19.9526 15.9438 15.8392 11.4948 14.6914C11.4834 14.8757 11.4737 15.06 11.4672 15.2444C11.2689 20.9234 13.6154 26.1011 17.4834 29.6784Z"
                        fill="#FF9100"/>
                    <path
                        d="M18.4938 1.25195C15.9599 3.2819 13.959 5.95857 12.7484 9.04203C12.0554 10.8082 11.6198 12.7053 11.4927 14.694C15.9417 15.8418 19.1562 19.9552 18.9893 24.7368C18.9258 26.5546 18.3789 28.2402 17.4812 29.6811C19.1756 31.2487 21.1611 32.5066 23.3533 33.3679C27.7535 31.3339 30.8755 26.9571 31.0563 21.7803C31.1734 18.4262 29.8847 15.4368 28.0638 12.9136C26.1407 10.245 18.4938 1.25195 18.4938 1.25195Z"
                        fill="#DD2C00"/>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M36 18.0026C36 15.9096 33.0135 13.9262 28.4346 12.6962C29.4912 8.60049 29.0216 5.34195 26.9523 4.29871C26.4753 4.054 25.9177 3.93808 25.3086 3.93808V5.37415C25.6461 5.37415 25.9177 5.43211 26.1451 5.54159C27.1431 6.04389 27.576 7.95651 27.2385 10.4165C27.1578 11.0218 27.0257 11.6594 26.8642 12.3098C25.426 12.0007 23.8557 11.7624 22.2046 11.6079C21.214 10.4165 20.1867 9.33462 19.1521 8.38797C21.5442 6.43672 23.7896 5.36771 25.3159 5.36771V3.93164C23.298 3.93164 20.6563 5.19384 17.9853 7.38337C15.3143 5.20672 12.6726 3.9574 10.6547 3.9574V5.39347C12.1737 5.39347 14.4264 6.45604 16.8186 8.39441C15.7913 9.34106 14.764 10.4165 13.788 11.6079C12.1296 11.7624 10.5593 12.0007 9.12108 12.3162C8.9523 11.6723 8.82756 11.0476 8.7395 10.4487C8.39462 7.98871 8.82022 6.07609 9.81084 5.56735C10.031 5.45143 10.3172 5.39991 10.6547 5.39991V3.96384C10.0383 3.96384 9.48064 4.07976 8.99633 4.32447C6.93437 5.36771 6.47208 8.61981 7.53608 12.7026C2.97187 13.9391 0 15.9161 0 18.0026C0 20.0955 2.98655 22.079 7.56543 23.309C6.50876 27.4047 6.97839 30.6632 9.0477 31.7064C9.52466 31.9512 10.0823 32.0671 10.6987 32.0671C12.7167 32.0671 15.3583 30.8049 18.0294 28.6153C20.7004 30.792 23.342 32.0413 25.36 32.0413C25.9764 32.0413 26.534 31.9254 27.0183 31.6807C29.0803 30.6374 29.5426 27.3853 28.4786 23.3025C33.0281 22.0725 36 20.0891 36 18.0026ZM26.446 13.7072C26.1745 14.538 25.8369 15.3945 25.4554 16.251C25.1545 15.7358 24.839 15.2206 24.4941 14.7054C24.1565 14.1902 23.797 13.6879 23.4374 13.1985C24.4794 13.3337 25.4847 13.5012 26.446 13.7072ZM23.0852 20.5656C22.5128 21.435 21.9258 22.2593 21.3168 23.0256C20.2234 23.1093 19.1154 23.1544 18 23.1544C16.892 23.1544 15.7839 23.1093 14.6979 23.0321C14.0889 22.2657 13.4945 21.4479 12.9221 20.5849C12.3645 19.7413 11.8581 18.8848 11.3958 18.0219C11.8508 17.159 12.3645 16.296 12.9148 15.4524C13.4872 14.583 14.0742 13.7588 14.6832 12.9924C15.7766 12.9087 16.8846 12.8636 18 12.8636C19.108 12.8636 20.2161 12.9087 21.3021 12.986C21.9111 13.7523 22.5055 14.5702 23.0779 15.4331C23.6355 16.2767 24.1419 17.1332 24.6042 17.9961C24.1419 18.8591 23.6355 19.722 23.0852 20.5656ZM25.4554 19.7284C25.8516 20.5914 26.1892 21.4543 26.468 22.2915C25.5067 22.4975 24.4941 22.6714 23.4448 22.8067C23.8043 22.3108 24.1639 21.8021 24.5014 21.2804C24.839 20.7652 25.1545 20.2436 25.4554 19.7284ZM18.0147 26.5997C17.3322 25.9815 16.6498 25.2924 15.9747 24.539C16.6351 24.5647 17.3102 24.584 17.9927 24.584C18.6824 24.584 19.3649 24.5712 20.0326 24.539C19.3722 25.2924 18.6898 25.9815 18.0147 26.5997ZM12.5552 22.8067C11.5132 22.6714 10.5079 22.504 9.54668 22.2979C9.81818 21.4672 10.1557 20.6107 10.5373 19.7542C10.8382 20.2694 11.1537 20.7846 11.4986 21.2997C11.8435 21.8149 12.1957 22.3172 12.5552 22.8067ZM17.978 9.40546C18.6604 10.0237 19.3428 10.7127 20.0179 11.4662C19.3575 11.4404 18.6824 11.4211 18 11.4211C17.3102 11.4211 16.6278 11.434 15.9601 11.4662C16.6205 10.7127 17.3029 10.0237 17.978 9.40546ZM12.5479 13.1985C12.1883 13.6944 11.8288 14.2031 11.4912 14.7247C11.1537 15.2399 10.8382 15.7551 10.5373 16.2703C10.1411 15.4073 9.80351 14.5444 9.52466 13.7072C10.4859 13.5076 11.4986 13.3337 12.5479 13.1985ZM5.90705 21.2611C3.30942 20.2887 1.62903 19.0136 1.62903 18.0026C1.62903 16.9915 3.30942 15.71 5.90705 14.744C6.53812 14.5058 7.22788 14.2933 7.93967 14.0936C8.35793 15.3558 8.90828 16.6695 9.59071 18.0155C8.91561 19.3549 8.37261 20.6622 7.96168 21.918C7.23522 21.7183 6.54546 21.4994 5.90705 21.2611ZM9.85487 30.4636C8.85691 29.9613 8.42397 28.0486 8.76152 25.5886C8.84224 24.9833 8.97432 24.3458 9.13575 23.6953C10.574 24.0045 12.1443 24.2427 13.7954 24.3973C14.786 25.5886 15.8133 26.6705 16.8479 27.6172C14.4558 29.5684 12.2104 30.6374 10.6841 30.6374C10.3539 30.631 10.075 30.573 9.85487 30.4636ZM27.2605 25.5564C27.6054 28.0164 27.1798 29.9291 26.1892 30.4378C25.969 30.5537 25.6828 30.6052 25.3453 30.6052C23.8263 30.6052 21.5736 29.5427 19.1814 27.6043C20.2087 26.6577 21.236 25.5822 22.212 24.3908C23.8704 24.2363 25.4407 23.998 26.8789 23.6825C27.0477 24.3329 27.1798 24.9575 27.2605 25.5564ZM30.0856 21.2611C29.4545 21.4994 28.7648 21.7119 28.053 21.9115C27.6347 20.6493 27.0844 19.3356 26.402 17.9897C27.077 16.6502 27.6201 15.3429 28.031 14.0872C28.7574 14.2868 29.4472 14.5058 30.0929 14.744C32.6906 15.7165 34.371 16.9915 34.371 18.0026C34.3636 19.0136 32.6832 20.2951 30.0856 21.2611Z"
                        fill="#61DAFB"/>
                    <path
                        d="M17.9931 20.9465C19.8451 20.9465 21.3465 19.6289 21.3465 18.0035C21.3465 16.3782 19.8451 15.0605 17.9931 15.0605C16.141 15.0605 14.6396 16.3782 14.6396 18.0035C14.6396 19.6289 16.141 20.9465 17.9931 20.9465Z"
                        fill="#61DAFB"/>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                       xlinkHref="http://www.w3.org/1999/xlink">
                    <g clipPath="url(#clip0_1846_31495)">
                        <mask id="mask0_1846_31495" mask="luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                              width="36" height="36">
                            <path
                                d="M36 16.6155L24 26.3077L36 36H22.2864L17.1432 31.8459L10.2852 26.3068L22.2852 16.6145L36 16.6155ZM22.2864 0L0 18.0005L6.858 23.5396L36 0H22.2864Z"
                                fill="white"/>
                        </mask>
                        <g mask="url(#mask0_1846_31495)">
                            <rect x="8.10449" y="14.9766" width="32.1" height="20.1192"
                                  fill="url(#pattern0_1846_31495)"/>
                            <path d="M35.9995 16.6152H22.2859L10.2871 26.3085L17.1415 31.8457L35.9995 16.6152Z"
                                  fill="#54C5F8"/>
                        </g>
                        <mask id="mask1_1846_31495" mask="luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                              width="36" height="36">
                            <path
                                d="M36 16.6155L24 26.3077L36 36H22.2864L17.1432 31.8459L10.2852 26.3068L22.2852 16.6145L36 16.6155ZM22.2864 0L0 18.0005L6.858 23.5396L36 0H22.2864Z"
                                fill="white"/>
                        </mask>
                        <g mask="url(#mask1_1846_31495)">
                            <path d="M6.858 23.5396L0 18.0005L22.2864 0H36L6.858 23.5396Z" fill="#54C5F8"/>
                        </g>
                        <mask id="mask2_1846_31495" mask="luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                              width="36" height="36">
                            <path
                                d="M36 16.6155L24 26.3077L36 36H22.2864L17.1432 31.8459L10.2852 26.3068L22.2852 16.6145L36 16.6155ZM22.2864 0L0 18.0005L6.858 23.5396L36 0H22.2864Z"
                                fill="white"/>
                        </mask>
                        <g mask="url(#mask2_1846_31495)">
                            <path d="M17.1416 31.8458L22.286 36.0009H35.9996L24.0008 26.3086L17.1416 31.8458Z"
                                  fill="#01579B"/>
                        </g>
                        <mask id="mask3_1846_31495" mask="luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                              width="36" height="36">
                            <path
                                d="M36 16.6155L24 26.3077L36 36H22.2864L17.1432 31.8459L10.2852 26.3068L22.2852 16.6145L36 16.6155ZM22.2864 0L0 18.0005L6.858 23.5396L36 0H22.2864Z"
                                fill="white"/>
                        </mask>
                        <g mask="url(#mask3_1846_31495)">
                            <path d="M17.1416 31.8458L27.3128 29.003L24.0008 26.3086L17.1416 31.8458Z"
                                  fill="url(#paint0_linear_1846_31495)"/>
                        </g>
                        <mask id="mask4_1846_31495" mask="luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                              width="36" height="36">
                            <path
                                d="M36 16.6155L24 26.3077L36 36H22.2864L17.1432 31.8459L10.2852 26.3068L22.2852 16.6145L36 16.6155ZM22.2864 0L0 18.0005L6.858 23.5396L36 0H22.2864Z"
                                fill="white"/>
                        </mask>
                        <g mask="url(#mask4_1846_31495)">
                            <path d="M17.1431 20.7703L10.2861 26.3086L17.1431 31.8469L24 26.3086L17.1431 20.7703Z"
                                  fill="#29B6F6"/>
                        </g>
                        <path
                            d="M36 16.6155L24 26.3077L36 36H22.2864L17.1432 31.8459L10.2852 26.3068L22.2852 16.6145L36 16.6155ZM22.2864 0L0 18.0005L6.858 23.5396L36 0H22.2864Z"
                            fill="url(#paint1_radial_1846_31495)"/>
                    </g>
                    <defs>
                        <pattern id="pattern0_1846_31495" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_1846_31495" transform="scale(0.00787402 0.010101)"/>
                        </pattern>
                        <linearGradient id="paint0_linear_1846_31495" x1="19.1426" y1="32.9158" x2="23.1753"
                                        y2="27.9227" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1A237E" stopOpacity="0.4"/>
                            <stop offset="1" stopColor="#1A237E" stopOpacity="0"/>
                        </linearGradient>
                        <radialGradient id="paint1_radial_1846_31495" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(1.0131 2.45433) scale(54.5316 44.0446)">
                            <stop stopColor="white" stopOpacity="0.1"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                        </radialGradient>
                        <clipPath id="clip0_1846_31495">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                        <image id="image0_1846_31495" width="127" height="99" preserveAspectRatio="none"
                               xlinkHref="data:image/png;base64,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"/>
                    </defs>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1846_31523)">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.9464 0C8.02249 0 0 8.25 0 18.4564C0 26.6149 5.14029 33.5209 12.2712 35.9651C13.1628 36.1489 13.4893 35.568 13.4893 35.0794C13.4893 34.6515 13.46 33.1849 13.46 31.6567C8.46771 32.757 7.42812 29.4566 7.42812 29.4566C6.62584 27.3176 5.4371 26.7679 5.4371 26.7679C3.80314 25.6372 5.55612 25.6372 5.55612 25.6372C7.36861 25.7595 8.31967 27.5317 8.31967 27.5317C9.92388 30.3427 12.5089 29.5485 13.5489 29.0595C13.6973 27.8677 14.173 27.0427 14.6781 26.5845C10.6964 26.1566 6.50718 24.5678 6.50718 17.4784C6.50718 15.4616 7.21984 13.8116 8.34906 12.5284C8.1709 12.0701 7.54678 10.1753 8.52759 7.63913C8.52759 7.63913 10.0429 7.15013 13.4596 9.53363C14.9224 9.12962 16.431 8.92411 17.9464 8.92237C19.4617 8.92237 21.0064 9.1365 22.4328 9.53363C25.8498 7.15013 27.3651 7.63913 27.3651 7.63913C28.346 10.1753 27.7215 12.0701 27.5433 12.5284C28.7023 13.8116 29.3856 15.4616 29.3856 17.4784C29.3856 24.5678 25.1963 26.1259 21.1849 26.5845C21.8388 27.165 22.403 28.2649 22.403 30.0067C22.403 32.4817 22.3736 34.4681 22.3736 35.079C22.3736 35.568 22.7006 36.1489 23.5918 35.9655C30.7227 33.5205 35.863 26.6149 35.863 18.4564C35.8924 8.25 27.8405 0 17.9464 0Z"
                              fill="#24292F"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1846_31523">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                , <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1846_31525)">
                        <path
                            d="M0.798828 15.0645V20.3182C9.10133 20.3295 15.8738 26.9895 15.9863 35.2132H21.1051C20.9813 24.1432 11.9363 15.1657 0.798828 15.0645Z"
                            fill="white"/>
                        <path
                            d="M0.798828 4.19727V9.45102C15.1313 9.46227 26.7976 20.9823 26.9101 35.2023H32.0288C31.9163 18.1585 17.9663 4.30977 0.798828 4.19727Z"
                            fill="white"/>
                        <path
                            d="M35.2014 21.7688V10.9801C33.8739 9.16883 32.2877 7.22258 30.6564 5.60258C28.8564 3.81383 26.8202 2.21633 24.7727 0.798828H13.3877C23.3214 4.37633 31.2864 12.0601 35.2014 21.7688Z"
                            fill="white"/>
                        <path
                            d="M0.798828 20.3184V33.4921C0.798828 34.4371 1.56383 35.2134 2.52008 35.2134H15.9751C15.8626 26.9784 9.10133 20.3296 0.798828 20.3184Z"
                            fill="#660066"/>
                        <path
                            d="M0.798828 9.46094V15.0634C11.9363 15.1647 20.9813 24.1422 21.0938 35.2122H26.9101C26.7976 20.9922 15.1313 9.47219 0.798828 9.46094Z"
                            fill="#660066"/>
                        <path
                            d="M35.2013 33.4801V21.7688C31.2863 12.0601 23.3213 4.37633 13.3876 0.798828H2.52008C1.57508 0.798828 0.798828 1.56383 0.798828 2.52008V4.20758C17.9663 4.30883 31.9163 18.1576 32.0288 35.2126H33.4913C34.4363 35.2013 35.2013 34.4363 35.2013 33.4801Z"
                            fill="#660066"/>
                        <path
                            d="M30.6674 5.60258C32.2987 7.22258 33.8849 9.16883 35.2124 10.9801V2.52008C35.2124 1.57508 34.4474 0.798828 33.4912 0.798828H24.7949C26.8199 2.21633 28.8674 3.81383 30.6674 5.60258Z"
                            fill="#660066"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1846_31525">
                            <rect width="36" height="36" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            ]
        }
    ]

    return (
        <div
            key={'container'}
            className={'flex w-full flex-col bg-[#FFFFFF]'}>
            <div
                key={"header"}
                className={'fixed top-0 left-0 flex  w-full z-50 shadow-sm items-center justify-between px-[40px] py-[20px] bg-white border-b'}>

                <div
                    className={"flex min-w-0 text-[#000000]"}>
                    Donghyeon Portfolio
                </div>

                <div
                    key={'header-right'}
                    className={"flex items-center gap-[20px] shrink-0"}>
                    <nav
                        className={`nav ${open ? 'open' : ''} `}>
                        <div
                            className={"flex gap-[20px] text-black"}>
                            <a href="#about">&lt;About me /&gt;</a>
                            <a href="#skills">&lt;Skills /&gt;</a>
                            <a href="#projects">&lt;Projects /&gt;</a>
                            <a href="#career">&lt;Career /&gt;</a>
                        </div>

                    </nav>
                </div>

            </div>

            <div
                id={"about"}
                className={'flex flex-col px-[100px] py-[50px] gap-[40px] bg-white items-center'}>

                <div
                    className={"text-[48px] font-bold text-black mt-[40px]"}>
                    About Me
                </div>

                <div
                    className={'flex items-center gap-[80px]'}>

                    <img
                        src={'https://smilekbear.s3.ap-northeast-2.amazonaws.com/id_photo.jpeg'}
                        alt={'profile-image'}
                        className={'w-[200px] h-[260px] rounded-[20px] object-cover'}
                    />

                    <div
                        className={'flex flex-col gap-[20px]'}>
                        {
                            aboutItem.map((item, index) => (
                                <div
                                    key={index}
                                    className={'flex gap-[8px]'}>
                                    {item.icon}
                                    <div
                                        className={'text-black text-start'}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                    </div>


                </div>

                <div
                    className={"mt-[40px] leading-[30px] text-[#121212] text-center"}>
                    다양한 환경에 빠르게 적응하는 프론트엔드 개발자입니다.<br/>
                    B2B 서비스부터 모바일 앱까지, 실사용자 중심의 UI를 만들어왔습니다.<br/>
                    새로운 기술에 거부감 없이, 변화와 함께 성장하는 개발자입니다.
                </div>
            </div>

            <div
                id={"skills"}
                className={'flex flex-col py-[50px] bg-[#F3F6Fc] items-center'}>

                <div
                    className={'flex flex-col max-w-[1200px] w-[1200px] gap-[40px] items-center'}>

                    <div
                        className={"text-[48px] font-bold text-black"}>
                        Skills
                    </div>


                    <div
                        className={'flex flex-col gap-[30px] w-full px-[80px] py-[40px] rounded-[20px] border border-solid border-[#E8ECF5]  bg-[#E8ECF5] justify-center'}>
                        {
                            skillList.map((item, index) => (
                                <div
                                    key={index}
                                    className={'flex gap-[20px]'}>
                                    <div
                                        className={'flex gap-[40px]'}>
                                        {item.icon}

                                        <div
                                            className={'min-w-[120px] text-black font-bold'}>
                                            {item.category}
                                        </div>
                                    </div>

                                    <div
                                        className={'flex gap-[40px] text-black'}>
                                        {
                                            item.item.map((skills, index) => (
                                                <div
                                                    key={index}>
                                                    {skills}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            <div
                id={"projects"}
                className={'flex flex-col py-[50px] bg-white items-center'}>

                <div
                    className={'flex flex-col max-w-[1200px] w-[1200px] gap-[40px] items-center'}>

                    <div
                        className={"text-[48px] font-bold text-black"}>
                        Projects
                    </div>

                    <div
                        className={'flex flex-wrap justify-center gap-[20px] max-w-[1000px] mt-[60px] mx-auto'}>
                        {
                            projectDummyData.map((item, index) => (
                                <Card key={index} {...item} />
                            ))
                        }
                    </div>

                </div>

            </div>


            <div
                id={"career"}
                className={'flex w-full flex-col py-[50px] bg-[#F3F6Fc] items-center'}>

                <div
                    className={'flex flex-col max-w-[1400px] w-[1400px] gap-[40px] items-center'}>

                    <div
                        className={"text-[48px] font-bold text-black"}>
                        Career
                    </div>

                    <div
                        className={'flex w-full gap-[50px] mt-[60px] mx-[300px]'}>

                        {
                            careerListDummyData.map((item, index) => (
                                <div
                                    key={index}
                                    className={'flex w-full flex-col flex-1 bg-[#E8ECF5] rounded-[10px] p-[20px]'}>
                                    <div
                                        className={'font-[14px] text-[#575757]'}>
                                        {item.period}
                                    </div>
                                    <p className={'font-[18px] mt-[20px] text-black'}>{item.title}</p>
                                    <p className={'font-[14px] mt-[10px] mb-[20px] text-black'}>{item.subTitle}</p>
                                    {
                                        item.works.map((item, index) => (
                                            <div
                                                key={index}>
                                                <div
                                                    className={'flex font-[12px] text-[#575757] mt-[10px]'}>
                                                    {item}
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div
                                        className={'flex mt-[80px] gap-[20px]'}>
                                        {
                                            item.skills.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={'flex w-[48px] h-[48px] bg-[#F3F6FC] rounded-[10px] items-center justify-center'}>
                                                    {item}
                                                    {/*<img src={item} alt={'skills_logo'}/>*/}
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className="relative w-[360px] h-[800] overflow-hidden rounded-3xl shadow-xl">
                    <iframe
                        title="Figma Prototype"
                        style={{border: "1px solid rgba(0,0,0,0.1)", width: "100%", height: "100%"}}
                        src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Il8NKCcN1qhvJXdhlnxpZQ/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=1%3A2&node-id=424-18915&viewport=469%2C438%2C0.32&t=Vkzt7PEnBBV0Yl47-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=424%3A18915&show-proto-sidebar=1&hide-ui=1"
                        allowFullScreen
                    />
                </div>
            </div>

        </div>

    );
};

export default Page;