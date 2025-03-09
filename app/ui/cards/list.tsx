'use client';

import { Card, Factions } from "@/app/lib/definitions";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CardList(
    {cards, currentCard}: 
    {
        cards: Card[], 
        currentCard: number
    }
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleClick = (cardId: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('cardId', cardId.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-wrap content-start
            shadow-inner overflow-scroll bg-stone-950 rounded
            p-auto w-full h-full
            sm:items-stretch">
            {cards.map((card, i) => (
                /* Single Card Layout */
                <div className={`w-full h-10 mt-1 mx-2 p-1 rounded-md text-slate-50
                    flex content-start justify-start
                    ${(currentCard === card.id)? "bg-orange-800" : "bg-yellow-900"}
                    sm:w-16 sm:h-28 sm:flex-col sm:items-center
                    hover:text-yellow-100 hover:shadow-xl hover:cursor-pointer`}
                    onClick={() => {
                        handleClick(card.id);
                    }}
                    id={card.id.toString()}
                    key={i}>
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto flex rounded border-2 ${Factions[card.faction].border}`}>
                        <Image src={card.image_url} alt="Card Image" width={40} height={40}
                            className={`w-full h-full`} />
                    </div>
                    <div className={`w-2/3 overflow-y
                        flex flex-grow flex-nowrap justify-center items-center 
                        text-center text-xs ${(currentCard === card.id) && "font-bold, text-emerald-200"}`}>
                        <div>{card.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}