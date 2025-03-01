import { Card, factionBorder, factionText } from "@/app/lib/definitions";
import Image from "next/image";

export default function CardDetails(
    {card}:
    {card: Card}
) {
    return (
        <div className="border-r border-x-yellow-700 flex flex-col min-w-80 max-w-80 overflow-scroll">
            {/* Image */}
            <div className="min-h-60 flex justify-center items-center">
                <Image src={card.image_url} alt="Card Image"  width={200} height={200} 
                    className={`border-4 ${factionBorder(card.faction)}`} />
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
        </div>
    );
}