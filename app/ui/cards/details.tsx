import { Card, Factions } from "@/app/lib/definitions";
import Image from "next/image";
import { CardButtons } from "@/app/ui/cards/buttons";
import { nanum } from "@/app/ui/fonts";

export default function CardDetails(
    {card}:
    {card: Card}
) {
    return (
        <div className="flex flex-col items-center 
            px-auto w-1/2 sm:w-80">
                Words
            {/* Image */}
            <div className="flex flex-col justify-center items-center">
                <Image src={card.image_url} alt="Card Image"  width={200} height={200} 
                    className={`rounded-lg border-4 shadow-xl 
                        ${Factions[card.faction].border}
                        w-44`}
                />
                {/* Name */}
                <h1 className="text-center text-xl font-bold">
                    {card.name}
                </h1>
            </div>

            <CardButtons />

            <div className="flex flex-col p-2 w-5/6 overflow-scroll">
                {/* Faction */}
                <div className="flex justify-between">
                    <div className="text-left flex-grow border-b border-black">Faction</div>
                    <div className={`text-right ${Factions[card.faction].text} w-20 ml-4`}>{card.faction}</div>
                </div>

                {/* Cost */}
                <div className="flex justify-between">
                    <div className="text-left flex-grow border-b border-black">Cost</div>
                    <div className="text-right ml-4 w-20">{card.cost}</div>
                </div>

                {/* Power */}
                {card.type.toString() === 'Character' && <div className="flex justify-between">
                    <div className="text-left flex-grow border-b border-black">Power</div>
                    <div className="text-right ml-4 w-20">{card.power}</div>
                </div>}

                {/* Abilities */}
                <div className="flex flex-col w-full">
                    <div className="text-left flex-grow">
                        {(card.type === 'Character')? 'Abilities' : 'Effects'}
                    </div>
                    <div className="flex flex-col bg-stone-50 shadow-inner w-full">
                        {card.abilities.map((ability, i) => {
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
        </div>
    );
}