import ActionButton from "@/app/ui/action-button";

export function Navbar() {
    return (
        <div className={`bg-stone-400 h-16 w-screen mb-2 pb-2
            flex flex-row justify-evenly items-end
            border-b-2 border-yellow-700 shadow-2xl
        `}>
            <NavLink href="/dashboard" text="Home" />
            <NavLink href="/dashboard/collection" text="Collection" />
            <NavLink href="/cards" text="Shop" />
            <NavLink href="/cards/trade" text="Trade" />
            <NavLink href="/cards/create" text="Create" />
            <ActionButton href="/play">Play</ActionButton>
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