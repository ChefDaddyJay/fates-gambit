'use server';

import { fetchCards } from "@/app/lib/data";
import CardDisplay from "@/app/ui/cards/display";
//import { useState } from "react";

export default async function StorePage() {
    const cards = await fetchCards();

    /*const [currentCard, setCard] = useState(cards[0]);

    const pickCard = (index: number) => {
        setCard(cards[index]);
    }*/

    let currentCard = cards[0];
    const pickCard = (i: number) => {currentCard = cards[i]} 
    
    return (
        <CardDisplay cards={cards} />
    );
}