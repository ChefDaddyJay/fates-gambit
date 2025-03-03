import { Card, EmptyCard } from "@/app/lib/definitions";
import CardList from "@/app/ui/cards/list";
import CardDetails from "@/app/ui/cards/details";

export function CardListSkeleton() {
    const placeholders: Card[] = [];
    for(let i = 0; i < 8; i++) {
        placeholders.push(EmptyCard);
    }
    return (
        <CardList cards={placeholders} currentCard={0} />
    );
}

export function CardDetailsSkeleton() {
    return (
        <CardDetails card={EmptyCard} />
    );
}