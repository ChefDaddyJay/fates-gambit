'use server';

import { buildRichListing, fetchListingById, fetchListings } from "@/app/lib/data";
import ListControls from "@/app/ui/cards/list-controls";
import ListingDisplay from "@/app/ui/market/listing-display";
import MarketList from "@/app/ui/market/market-list";
import { ListSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function MarketPage(props: {
    searchParams?: Promise<{
        query?: string,
        listingId?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const data = await fetchListings();
    const listings = await Promise.all(data.map((l) => buildRichListing(l)));
    const currentListing = await buildRichListing(await fetchListingById(searchParams?.listingId || listings[0].id));

    return (
        <div className="flex flex-grow justify-between p-2 
            bg-stone-200 shadow rounded h-full overflow-clip">
            <ListingDisplay listing={currentListing} />
            <div className="flex flex-col w-full">
                <ListControls />
                <Suspense fallback={<ListSkeleton />}>
                    <MarketList listings={listings} currentListing={currentListing.id} />
                </Suspense>
            </div>
        </div>
    );
}