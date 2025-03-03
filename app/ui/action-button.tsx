import React from "react";

export default function ActionButton({href, children}: {href: string, children: React.ReactNode}) {
    return (
        <a href={href}>
            <div className="m-1 p-2 justify-self-end self-center 
                border border-yellow-700 bg-stone-300 rounded
                hover:shadow hover:border-yellow-500 hover:text-yellow-950 hover:bg-stone-200
                w-14 h-8
                flex justify-center items-center
                bg-violet-600 sm:bg-red-400 md:bg-orange-400 lg:bg-yellow-400 xl:bg-green-400 2xl:bg-blue-400">
                {children}
            </div>
        </a>
    );
}