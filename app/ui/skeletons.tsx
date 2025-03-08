import { Card, EmptyCard } from "@/app/lib/definitions";
import CardDetails from "@/app/ui/cards/details";

export function CardListSkeleton() {
    const placeholders: Card[] = [];
    for(let i = 0; i < 8; i++) {
        placeholders.push(EmptyCard);
    }
    return (
        <div className="flex flex-wrap content-start
            shadow-inner overflow-scroll bg-stone-950 rounded
            p-auto w-full h-full">
            {placeholders.map((card, i) => (
                /* Single Card Layout */
                <div className={`w-full h-10 mt-1 mx-2 p-1 rounded-md text-slate-50
                    flex content-start justify-start bg-yellow-900
                    hover:text-yellow-100 hover:shadow-xl hover:cursor-pointer`}
                    key={i}>
                    <div className={`w-1/4 mx-auto flex rounded border-2 border-black`} />
                    <div className={`w-2/3 overflow-y
                        flex flex-grow flex-nowrap justify-center items-center 
                        text-center text-xs`}>
                        <div>{card.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function CardDetailsSkeleton() {
    return (
        <CardDetails card={EmptyCard} />
    );
}