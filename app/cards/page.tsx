import { fetchCards } from "../lib/data";

export default async function StorePage() {
    const cards = await fetchCards();
    
    return (
        <div className="flex flex-col justify-evenly">
            {cards.map((card) => 
                <div key={card.id}>{card.name}</div>
            )}
        </div>
    );
}