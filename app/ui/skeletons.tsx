import { EmptyCard } from "@/app/lib/definitions";
import CardDetails from "@/app/ui/cards/card-display";

export function ListSkeleton() {
    return (
        <div className="flex flex-wrap content-start
            shadow-inner overflow-scroll bg-stone-950 rounded
            p-auto w-full h-full
            sm:items-stretch">
        </div>
    );
}

export function CardDetailsSkeleton() {
    return (
        <CardDetails card={EmptyCard} owned={0} />
    );
}