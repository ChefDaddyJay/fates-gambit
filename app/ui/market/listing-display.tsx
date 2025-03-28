'use client';

import { RichSaleListing } from "@/app/lib/definitions";
import { CardImage } from "../cards/card-display";
import { GiCreditsCurrency } from "react-icons/gi";

export default function ListingDisplay(
    {listing}:
    {
        listing: RichSaleListing
    }
) {
    return (
        <div className="relative flex flex-col items-center justify-start
            pr-2 w-1/2 h-full sm:w-80 shadow-2xl
            text-gray-900">
            <CardImage 
                src={listing.card.image_url} 
                name={listing.card.name} 
                faction={listing.card.faction}
            />
            <ListingDetails 
                user={listing.user.name}
                card={listing.card.name}
                copies={listing.copies}
                price={listing.price}
                date={listing.date}
            />
            <BuyButton price={listing.price}
            />
        </div>
    );
}

export function ListingDetails(
    {user, card, copies, price, date}:
    {
        user: string,
        card: string, 
        copies: number,
        price: number,
        date: Date
    }
) {
    return (
        <div className="flex flex-col p-2 w-5/6 space-y-2 overflow-scroll">
            <div className="flex justify-between">
                <div className="text-left w-10">User</div>
                <div className={`text-right flex-grow border-b border-black w-20 ml-4`}>{user}</div>
            </div>
            <div className="flex justify-between">
                <div className="text-left w-10">Offer</div>
                <div className="text-right flex-grow border-b border-black ml-4 w-20">{copies} x {card}</div>
            </div>
            <div className="flex justify-between">
                <div className="text-left w-10">Price</div>
                <div className="text-right flex-grow border-b border-black ml-4 w-20 flex justify-end items-center">
                    <GiCreditsCurrency className="mr-1" /> {price}
                </div>
            </div>
            <div className="flex justify-center text-sm">
                {date.toDateString()}
            </div>
        </div>
    );
}

export function BuyButton(
    {price}:
    {
        price: number
    }
) {
    return (
        <button>Buy <GiCreditsCurrency /> {price}</button>
    );
}