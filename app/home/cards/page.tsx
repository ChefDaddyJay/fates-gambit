'use server';

import { fetchCardById, fetchFilteredCards } from "@/app/lib/data";
import CardList from "@/app/ui/cards/list";
import ListControls from "@/app/ui/cards/list-controls";
import CardDetails from "@/app/ui/cards/details";
import { EmptyCard } from "@/app/lib/definitions";
import Pagination from "@/app/ui/pagination";
import { Suspense } from "react";
import { CardListSkeleton } from "../../ui/skeletons";

export default async function StorePage(props: {
    searchParams?: Promise<{
        query?: string,
        page?: string,
        cardId?: string,
        items?: string,
        faction?: string,
        type?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const fetch = await fetchFilteredCards(
        searchParams?.query || '',
        searchParams?.faction || '',
        searchParams?.type || '',
        Number(searchParams?.page) || 1
    );
    const cards = fetch.cards;
    const currentCardId = Number(searchParams?.cardId) || 0;
    const currentCard = await fetchCardById(currentCardId) 
        || cards[0] 
        || EmptyCard;
    const totalPages = fetch.pages;
    
    return (
        <div className="flex flex-grow justify-between p-2 
            bg-stone-200 shadow rounded h-full overflow-clip">
            <CardDetails card={currentCard} />
            <div className="flex flex-col w-full pl-2">
                <ListControls />
                <Suspense fallback={<CardListSkeleton />}>
                    <CardList cards={cards} currentCard={currentCard.id} />
                </Suspense>
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}