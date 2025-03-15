export default function CollectionPage() {
    return (
        <div className="flex flex-grow p-2 bg-stone-200 shadow h-full overflow-clip">
            <div className="border-r border-x-yellow-700 flex flex-col min-w-80">
                <div className="min-h-60 flex justify-center items-center">Card image</div>
                <div className="border-t-4 border-yellow-700 flex-grow p-2">Card info</div>
            </div>

            {/* Cards List */}
            <div className="flex flex-grow flex-wrap justify-center shadow-inner p-4 h-full overflow-scroll bg-stone-700">
                <Cards />
            </div>
        </div>
    );
}

const Cards = () => {
    const cards: string[] = []
    for(let i = 0; i < 500; i++) {
        cards.push(i.toString());
    }
    return (
        <>
        {cards.map((c, i) => (
            <div className="w-20 h-32 m-4 rounded
                border-2 border-stone-800 bg-yellow-900 text-slate-50
                hover:text-yellow-100 hover:shadow-xl hover:cursor-pointer" 
                key={i}>
                <div className="w-16 h-16 mx-auto flex justify-center items-center">{c}</div>
                <div className="w-full pt-2 border-t-2 border-stone-800 text-center">Card Name</div>
            </div>
        ))}
        </>
    );
}