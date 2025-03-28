'use client';

import { Factions, RichSaleListing } from "@/app/lib/definitions";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { GiCreditsCurrency } from "react-icons/gi";

export default function MarketList(
    {listings, currentListing}: 
    {
        listings: RichSaleListing[], 
        currentListing: string
    }
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleClick = (id: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('listingId', id.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col content-start
            shadow-inner overflow-scroll bg-stone-950 rounded
            p-2 w-full h-full space-y-2
            sm:items-stretch">
            {listings.map((listing) => (
                <Listing
                    current={currentListing === listing.id}
                    data={listing}
                    onClick={handleClick}
                    key={listing.id}
                />
            ))}
        </div>
    );
}

export function Listing(
    {current, data, onClick}:
    {
        current: boolean,
        data: RichSaleListing,
        onClick?: (id: string) => void
    }
) {
    return (
        <div className={`w-full p-2 
            text-gray-200 space-x-2
            ${current 
                ? 'border-2 bg-gray-800' 
                : 'border hover:bg-gray-800'
            } 
            border-gray-400 rounded
            flex justify-evenly items-center
            cursor-pointer`}
            onClick={() => {
                if(onClick) onClick(data.id);
            }}
            id={data.id.toString()}>
            <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto flex rounded border-2 ${Factions[data.card.faction].border}`}>
                <Image src={data.card.image_url} alt="Card Image" width={40} height={40}
                    className={`w-full h-full`} />
            </div>
            <div className="flex flex-grow justify-between
                pl-2 pr-10 text-2xl
                border-r border-gray-400">
                <div>{data.card.name}</div>
                <div>x {data.copies}</div>
            </div>
            <div className="flex justify-between items-end w-1/4 h-full">
                <div className="rounded-full bg-gray-300 
                    text-gray-900 py-2 px-4 w-1/2
                    border border-black
                    flex-grow flex justify-center items-center">
                    {data.user.name}
                </div>
                <div className="text-lg font-bold
                    flex justify-end items-center
                    h-3/4 w-1/2 pr-4"
                >
                    <GiCreditsCurrency className="mr-1" /> {data.price}
                </div>
                <div className="flex-shrink text-xs
                    flex flex-col justify-end h-3/4"
                >
                    {data.date.toDateString()}
                </div>
            </div>
        </div>
    );
}