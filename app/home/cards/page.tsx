'use server';

import { fetchCardById, fetchCardsByName, fetchCardsPages } from "@/app/lib/data";
import CardList from "@/app/ui/cards/list";
import CardDetails from "@/app/ui/cards/details";
import { EmptyCard } from "@/app/lib/definitions";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";
import { Suspense } from "react";
import { CardListSkeleton } from "../../ui/skeletons";

export default async function StorePage(props: {
    searchParams?: Promise<{
        query?: string,
        page?: string,
        cardId?: string,
        items?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const cards = await fetchCardsByName(query, currentPage);
    const currentCardId = Number(searchParams?.cardId) || 0;
    const currentCard = await fetchCardById(currentCardId) 
        || cards[0] 
        || EmptyCard;
    const totalPages = await fetchCardsPages(query) || 1;
    
    return (
        <div className="flex flex-grow justify-between p-2 
            bg-stone-200 shadow rounded h-full overflow-clip">
            <CardDetails card={currentCard} />
            <div className="flex flex-col w-full pl-2">
                <Search placeholder="Card name..."/>
                <Suspense fallback={<CardListSkeleton />}>
                    <CardList cards={cards} currentCard={currentCard.id} />
                </Suspense>
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}