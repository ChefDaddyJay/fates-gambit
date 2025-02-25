import { merienda } from "@/app/ui/fonts";

export function Clickable(
    {href, text, hidden}: {
        href: string, 
        text: string, 
        hidden?: boolean
    }) {
    return (
        <a href={href}>
            <div className={`p-2 my-4 mr-10
                ${merienda.className} text-3xl
                bg-slate-100 border border-transparent shadow
                hover:border-slate-500 hover:shadow-md hover:rounded
                ${hidden && "scale-x-0"} duration-300 origin-left
            `}>
                <div className={`origin-left delay-100 duration-150 ${hidden && "scale-0"}`}>{text}</div>
            </div>
        </a>
    );
}