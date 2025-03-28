import ActionButton from "@/app/ui/action-button";
import { signOut } from "@/auth";
import { ReactNode } from "react";
import { GiExitDoor } from "react-icons/gi";

export function Navbar() {
    return (
        <div className={`bg-stone-400 h-16 w-screen mb-2 pb-2
            flex flex-row justify-evenly items-end
            border-b-2 border-yellow-700 shadow-2xl
        `}>
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/home/cards">Cards</NavLink>
            <NavLink href="/home/cards/create">Create</NavLink>
            <ActionButton href="/home/play">Play</ActionButton>
            <form 
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}
            >
                <button className="m-1 p-2 justify-self-end self-center 
                    border border-yellow-700 bg-stone-300 rounded
                    hover:shadow hover:border-yellow-500 hover:text-yellow-950 hover:bg-stone-200
                    w-14 h-8
                    flex justify-center items-center"
                >
                    <GiExitDoor />
                </button>
            </form>
        </div>
    );
}

export function NavLink({href, children}: {
    href: string,
    children: ReactNode
}) {
    return (
        <a href={href}>
            <div className="m-1 hover:text-yellow-900 hover:border-y border-yellow-900">
                {children}
            </div>
        </a>
    );
}