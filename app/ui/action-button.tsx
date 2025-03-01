import React from "react";

export default function ActionButton({href, children}: {href: string, children: React.ReactNode}) {
    return (
        <a href={href}>
            <div className="m-1 p-2 px-10 justify-self-end self-center 
                border border-yellow-700 bg-stone-300 
                hover:shadow hover:border-yellow-500 hover:text-yellow-950 hover:bg-stone-200">
                {children}
            </div>
        </a>
    );
}