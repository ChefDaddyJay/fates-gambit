'use client';

import Image from "next/image";
import { Card, factionBorder, factionText } from "@/app/lib/definitions";
import { useState } from "react";
import ActionButton from "@/app/ui/action-button";

export default function CardDisplay({cards}: {cards: Card[]}) {
    const [currentCard, setCard] = useState(cards[0]);

    const selectCard = (cardIndex: number) => {
        setCard(cards[cardIndex]);
    }

    return (
        <div className="flex flex-grow p-2 bg-stone-200 shadow h-full overflow-clip">
            <CardDetails card={currentCard} />
            <CardList cards={cards} handleClick={selectCard} current={currentCard.id} />
        </div>
    );
}

export function CardList(
    {cards, handleClick, current}: 
    {
        cards: Card[], 
        handleClick: (id: number) => void,
        current: string
    }
) {
    return (
        <div className="flex flex-grow flex-wrap justify-center shadow-inner p-4 h-full overflow-scroll bg-stone-700">
            {cards.map((card, i) => (
                <div className={`w-24 h-40 m-4 rounded
                    border-2 ${factionBorder(card.faction)}
                    ${(current === card.id)? "bg-orange-800" : "bg-yellow-900"} text-slate-50
                    hover:text-yellow-100 hover:shadow-xl hover:cursor-pointer`}
                    onClick={() => handleClick(i)}
                    id={card.id}
                    key={i}>
                    <div className="w-16 h-16 mx-auto my-2 flex justify-center items-center">
                        <Image src={card.image_url} alt="Card Image" width={60} height={60}
                            className="border border-black" />
                    </div>
                    <div className={`w-full pt-2
                        border-t-2 border-stone-800 
                        flex flex-grow justify-center items-center 
                        text-center ${(current === card.id) && "font-bold, text-emerald-200"}`}>
                        <div>{card.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function CardDetails(
    {card}:
    {card: Card}
) {
    return (
        <div className="border-r border-x-yellow-700 flex flex-col min-w-80 max-w-80 overflow-scroll">
            {/* Image */}
            <div className="min-h-60 flex justify-center items-center">
                <Image src={card.image_url} alt="Card Image"  width={200} height={200} 
                    className={`border-4 shadow-xl ${factionBorder(card.faction)}`} />
            </div>

            <div className="border-t-4 border-yellow-700 flex-grow flex flex-col p-2">
                {/* Name */}
                <h1 className="text-center text-xl font-bold border-b border-black">
                    {card.name}
                </h1>

                {/* Faction */}
                <div className="flex justify-between">
                    <div className="text-left flex-grow border-b border-black">Faction</div>
                    <div className={`text-right ${factionText(card.faction)} ml-4 min-w-20`}>{card.faction}</div>
                </div>

                {/* Cost */}
                <div className="flex justify-evenly">
                    <div className="text-left flex-grow border-b border-black ml-4">Cost</div>
                    <div className="text-right ml-4 min-w-20">{card.cost}</div>
                </div>

                {/* Power */}
                {card.type.toString() === 'Character' && <div className="flex justify-between">
                    <div className="text-left flex-grow border-b border-black ml-4">Power</div>
                    <div className="text-right ml-4 min-w-20">{card.power}</div>
                </div>}

                {/* Abilities */}
                <div className="flex flex-col text-center mt-4">
                    <h2 className="text-left text-lg font-bold pt-2 border-b border-t-2 border-black flex-shrink">Abilities</h2>
                    <div className="flex flex-col text-right">
                        {card.abilities.map((ability, i) => {
                            return (
                                <div key={i}>{ability}</div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <CardActions />
        </div>
    );
}

export function CardActions() {
    return (
        <div className="flex justify-around border-black m-2 bg-stone-700 shadow-inner">
            <ActionButton href="/cards/buy">Buy</ActionButton>
            <ActionButton href="/cards/trade">Trade</ActionButton>
        </div>
    );
}