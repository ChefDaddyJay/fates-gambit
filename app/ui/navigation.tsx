export function Navbar() {
    return (
        <div className={`bg-stone-400 h-16 w-screen mb-2 pb-2
            flex flex-row justify-evenly items-end
            border-b-2 border-yellow-700 shadow-2xl
        `}>
            <NavLink href="/dashboard" text="Home" />
            <NavLink href="/dashboard/collection" text="Collection" />
            <NavLink href="/store/buy" text="Shop" />
            <NavLink href="/store/trade" text="Trade" />
            <PlayButton />
        </div>
    );
}

export function NavLink({href, text}: {
    href: string,
    text: string
}) {
    return (
        <a href={href}>
            <div className="m-1 hover:text-yellow-900 hover:border-y border-yellow-900">
                {text}
            </div>
        </a>
    );
}

export function PlayButton() {
    return (
        <a href="/play">
            <div className="m-1 p-2 px-10 justify-self-end self-center 
                border border-yellow-700 bg-stone-300 
                hover:shadow hover:border-yellow-500 hover:text-yellow-950 hover:bg-stone-200">
                Play
            </div>
        </a>
    );
}