'use client';

import Search from "@/app/ui/search";
import { useState } from "react";
import { GiFunnel } from "react-icons/gi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Factions, CardTypes } from "@/app/lib/definitions";

export default function ListControls() {
    const [menuState, setMenuState] = useState(false);    
    const toggleMenu = () => {
        setMenuState(!menuState);
    }

    return (
        <div className="flex justify-between w-full relative
            bg-stone-200">
            <Search placeholder="Card name..."/>
            <FiltersButton onClick={toggleMenu} active={menuState} />
            <FiltersMenu active={menuState} />
        </div>
    );
}

export function FiltersMenu(
    {active}: {active: boolean}
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [activeFilters, setFilters] = useState({
        faction: searchParams.get('factions'),
        type: searchParams.get('types')
    });

    const handleChange = (filterType: string, term: string) => {
        const params = new URLSearchParams(searchParams);
        const filters = {...activeFilters};
        type FilterKey = keyof typeof filters;
        
        params.set('page', '1');
        if(term.length > 0) params.set(filterType.toLowerCase(), term);
        else params.delete(filterType.toLowerCase());
        filters[filterType.toLocaleLowerCase() as FilterKey] 
            = term.length > 0 ? term : null;
        
        setFilters(filters);
        replace(`${pathname}?${params.toString()}`);
    };
   
    return (
        <div className={`absolute right-0 w-full max-w-60 p-2
            ${active? '-bottom-60 h-60 z-10' : 'bottom-0 h-0 -z-10'}
            bg-gray-800 opacity-80 duration-300 transition-all
            border-b-4 border-gray-500 text-gray-200
            flex flex-col justify-evenly overflow-scroll
            `}>

            <FilterSet 
                type="Faction" 
                options={Object.keys(Factions)}
                active={activeFilters.faction?.split(',') || []}
                onChange={handleChange}
            />

            <FilterSet
                type="Type"
                options={Object.keys(CardTypes)}
                active={activeFilters.type?.split(',') || []}
                onChange={handleChange}
            />
        </div>
    );
}

export function FilterSet(
    {type, options, active, onChange}:
    {
        type: string,
        options: string[],
        active: string[],
        onChange: (type: string, value: string) => void
    }
) {
    const unfiltered = active.length === 0;
    const handleChange = (term: string, set: boolean) => {
        if(set || unfiltered) {
            if(!active.includes(term)) {
                active.splice(active.length, 0, term);
            }
        } else {
            if(active.includes(term)) {
                active.splice(active.indexOf(term), 1);
            }
        }
        onChange(type, active.toString());
    }

    return (
        <div className="flex justify-between">
            <span className="flex-grow">{type}</span>
            <div className="flex flex-col w-2/3 pl-2
                justify-start border-l border-black">
                {options.map((o) => <FilterOption
                    key={`${type}-${o}`}
                    value={o}
                    active={unfiltered || active.includes(o)}
                    onChange={handleChange}
                />)}
            </div>
        </div>
    );
}

export function FilterOption(
    {value, active, onChange}:
    {
        value: string,
        active: boolean,
        onChange: (value: string, set: boolean) => void
    }
) {
    const handleClick = () => {
        onChange(value, !active);
    }

    return (
        <div className="flex justify-between hover:bg-gray-700"
            onClick={handleClick}>
            <label htmlFor={value}>{value}</label>
            <input name={value} type="checkbox" value={value}
                onChange={handleClick}
                checked={active} />
        </div>
    );
}

export function FiltersButton(
    {onClick, active}: 
    {
        onClick: () => void,
        active: boolean
    }
) {
    return (
        <button onClick={onClick}>
            <GiFunnel className={`h-8 w-8 ml-2 p-1 mb-1
                ${active ? 'bg-stone-300' : 'bg-strone-200'}
                text-gray-800 border rounded border-black
                hover:shadow hover:bg-stone-300 
                cursor-pointer`}
            />
        </button>
    );
}