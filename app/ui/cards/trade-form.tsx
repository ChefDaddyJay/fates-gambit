'use client';

import { Card } from "@/app/lib/definitions";
import { WideButton } from "@/app/ui/buttons";

export default function TradeForm(
    {back, card}:
    {
        back: () => void,
        card: Card
    }
) {
    return (<>
        <div className={`w-full h-full flex flex-col justify-center`}>
            <WideButton>Add {card.name} to your Collection</WideButton>
            <span>- or -</span>
            <WideButton>Offer to {card.name} other Players</WideButton>
        </div>
        <div className="h-12 w-full p-2 m-2
            flex flex-col justify-center items-center
            bg-gray-400 text-gray-900 border border-black rounded
            hover:bg-gray-300 hover:shadow-xl cursor-pointer
            absolute bottom-0 left-1"
            onClick={back}>
            Back
        </div>
        </>
    );
}