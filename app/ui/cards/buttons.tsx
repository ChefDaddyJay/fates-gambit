'use client';

import ActionButton from "@/app/ui/action-button";

export function CardButtons() {
    return (
        <div className="flex justify-around shadow-inner
            rounded border-black bg-stone-700
            m-2 w-11/12">
            <ActionButton href="/cards/buy">Buy</ActionButton>
            <ActionButton href="/cards/trade">Trade</ActionButton>
        </div>
    );
}