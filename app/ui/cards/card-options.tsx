import { Card } from "@/app/lib/definitions";
import { useState } from "react";
import { GiGrowth } from "react-icons/gi";
import TradeForm from "@/app/ui/cards/trade-form";
import SaleForm from "@/app/ui/cards/sale-form";
import MarketListings from "@/app/ui/cards/market";

export default function CardOptions(
    {card, owned}:
    {
        card: Card,
        owned: number
    }
) {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const changePage = (page: number) => {
        setOpen(false);
        setPage(page);
        setOpen(true);
    }
    const pages = [
        <MainOptions setPage={changePage} owned={owned} key={0} />,
        <SaleForm back={() => changePage(0)} card={card} copies={owned} key={1} />,
        <TradeForm back={() => changePage(0)} card={card} key={2} />,
        <MarketListings back={() => changePage(0)} card={card} key={3} />
    ]

    return (<>
        <div className={`
            absolute top-0 left-full h-full
            bg-gray-900 text-gray-100
            border-r-4 border-gray-400
            transition-all duration-300
            ${open
                ? 'w-full delay-100'
                : 'w-0'
            }
        `}>
            <div className={`absolute top-10 p-2 h-9/10 w-11/12
                flex flex-col justify-center items-center
                transition-all
                ${open 
                    ? 'z-10 delay-200' 
                    : '-z-10'}
            `}>
                {pages[page]}
            </div>
            <GiGrowth className={`
                absolute top-1/2 -right-3
                h-6 w-6 rounded-full p-1
                bg-gray-400 border border-gray-900
                cursor-pointer hover:h-7 hover:w-7 hover:-right-4
                transition-all
                ${open
                    ? '-rotate-90'
                    : 'rotate-90'
                }
            `} onClick={() => {
                setOpen(!open)
                setPage(0);
            }} />
        </div>
    </>);
}

function MainOptions(
    {setPage, owned}:
    {
        setPage: (page: number) => void,
        owned: number
    }
) {
    return (
        <>
            {owned > 0 && <Option onClick={() => setPage(1)} label="List for Sale" />}
            <Option onClick={() => setPage(2)} label="List for Trade" />
            <Option onClick={() => setPage(3)} label="Search the Market" />
        </>
    );
}

function Option(
    {onClick, label}:
    {
        onClick: () => void,
        label: string
    }
) {
    return (

        <button className="h-12 w-full p-2 m-2
            flex flex-col justify-center items-center
            bg-gray-400 text-gray-900 border border-black rounded
            hover:bg-gray-300 hover:shadow-xl cursor-pointer"
            onClick={onClick}>
            {label}
        </button>
    );
}