'use server';

import { fetchCards } from "@/app/lib/data";
import CardDisplay from "@/app/ui/cards/display";

export default async function StorePage() {
    const cards = await fetchCards();
    
    return (
        <CardDisplay cards={cards} />
    );
}