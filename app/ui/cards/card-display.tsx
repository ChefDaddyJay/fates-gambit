'use client';

import { Card, Factions} from "@/app/lib/definitions";
import Image from "next/image";
import { nanum } from "@/app/ui/fonts";
import CardOptions from "@/app/ui/cards/card-options";

export default function CardDisplay(
    {card, owned}:
    {
        card: Card,
        owned: number
    }
) {
    return (
        <div className="relative flex flex-col items-center justify-start
            pr-2 w-1/2 h-full sm:w-80 shadow-2xl
            text-gray-900">
            <CardImage src={card.image_url} name={card.name} faction={card.faction} />
            <CardDetails 
                faction={card.faction}
                cost={card.cost}
                power={card.power}
                type={card.type}
                abilities={card.abilities}
            />
            <CardOptions card={card} owned={owned} />
        </div>
    );
}

export function CardImage(
    {src, name, faction}:
    {
        src: string,
        name: string,
        faction: string
    }
) {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image src={src} alt="Card Image"  width={200} height={200} 
                className={`rounded-lg border-4 shadow-xl 
                    ${Factions[faction].border}
                    w-44`}
            />
            
            <h1 className="text-center text-xl font-bold">
                {name}
            </h1>
        </div>
    );
}

export function CardDetails(
    {faction, cost, power, type, abilities}:
    {
        faction: string,
        cost: number,
        power: number,
        type: string,
        abilities: string[]
    }
) {
    return (
        <div className="flex flex-col p-2 w-5/6 overflow-scroll">
            {/* Faction */}
            <div className="flex justify-between">
                <div className="text-left flex-grow border-b border-black">Faction</div>
                <div className={`text-right ${Factions[faction].text} w-20 ml-4`}>{faction}</div>
            </div>

            {/* Cost */}
            <div className="flex justify-between">
                <div className="text-left flex-grow border-b border-black">Cost</div>
                <div className="text-right ml-4 w-20">{cost}</div>
            </div>

            {/* Power */}
            {type.toString() === 'Character' && <div className="flex justify-between">
                <div className="text-left flex-grow border-b border-black">Power</div>
                <div className="text-right ml-4 w-20">{power}</div>
            </div>}

            {/* Abilities */}
            <div className="flex flex-col w-full flex-grow">
                <div className="text-left flex-grow">
                    {(type === 'Character')? 'Abilities' : 'Effects'}
                </div>
                <div className="flex flex-col bg-stone-50 shadow-inner w-full">
                    {abilities.map((ability, i) => {
                        return (
                            <div className={`p-1 mb-1 mr-1 flex text-left shadow-inner
                                ${nanum.className}
                                ${(i === 0)? 'border-none' : 'border-t border-stone-400'}
                            `} key={i}>
                                {ability}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}