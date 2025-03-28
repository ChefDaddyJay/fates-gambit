import { Card } from "@/app/lib/definitions";

export default function MarketListings(
    {back, card}:
    {
        back: () => void,
        card: Card
    }
) {
    return (
        <>
        <h1>Listings for {card.name}</h1>
        <div className="h-12 w-full p-2 m-2
            flex flex-col justify-center items-center
            bg-gray-400 text-gray-900 border border-black rounded
            hover:bg-gray-300 hover:shadow-xl cursor-pointer
            absolute bottom-0 left-1"
            onClick={back}>
            Back
        </div></>
    );
}