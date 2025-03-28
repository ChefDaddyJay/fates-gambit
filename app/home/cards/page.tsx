'use server';

import { fetchCardById, fetchCopies, fetchFilteredCards } from "@/app/lib/data";
import CardList from "@/app/ui/cards/card-list";
import ListControls from "@/app/ui/cards/list-controls";
import CardDisplay from "@/app/ui/cards/card-display";
import { EmptyCard } from "@/app/lib/definitions";
import { Suspense } from "react";
import { ListSkeleton } from "../../ui/skeletons";
import { auth } from "@/auth";

export default async function CardsPage(props: {
    searchParams?: Promise<{
        query?: string,
        cardId?: string,
        items?: string,
        faction?: string,
        type?: string,
        other?: string
    }>
}) {
    const session = await auth();
    const searchParams = await props.searchParams;
    const cards = await fetchFilteredCards(
        searchParams?.query || '',
        searchParams?.faction || '',
        searchParams?.type || '',
        searchParams?.other || '',
        session?.user.id || ''
    );
    const currentCardId = Number(searchParams?.cardId) || 0;
    const currentCard = await fetchCardById(currentCardId) 
        || cards[0] 
        || EmptyCard;
    const copies = await fetchCopies(session?.user.id || '', currentCardId);
    
    return (
        <div className="flex flex-grow justify-between p-2 
            bg-stone-200 shadow rounded h-full overflow-clip">
            <CardDisplay card={currentCard} owned={copies} />
            <div className="flex flex-col w-full">
                <ListControls />
                <Suspense fallback={<ListSkeleton />}>
                    <CardList cards={cards} currentCard={currentCard.id} />
                </Suspense>
            </div>
        </div>
    );
}