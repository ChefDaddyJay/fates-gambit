'use client';

import { createCard, CardState } from "@/app/lib/actions";
import { CardEntry, Factions } from "@/app/lib/definitions";
import { MouseEvent, ChangeEvent, useActionState, useState } from "react";
import Image from "next/image";
import { HiOutlineMinusCircle, HiOutlinePlus } from "react-icons/hi2";

export default function Form() {
    const initialState: CardState = { 
        message: null, 
        errors: {}
    }
    const [actionState, formAction] = useActionState(createCard, initialState);
    
    const [state, setState] = useState<CardEntry>({
        ability: '',
        abilityList: [],
        power: 0,
        type: 'Character',
        faction: 'Seers'
    });

    const addAbility = () => {
        const temp = {...state};
        temp.abilityList.push(state.ability);
        temp.ability = '';
        setState(temp);
    }

    const removeAbility = (e: MouseEvent<HTMLButtonElement>) => {
        const i = parseInt(e.currentTarget.value);
        const temp = {...state};
        const list = state.abilityList;
        temp.abilityList = list.slice(0, i).concat(list.slice(i + 1));
        setState(temp);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const temp = {...state};
        if(isNaN(parseInt(val))) { temp.ability = val }
        else { 
            temp.power = parseInt(val);
            temp.abilityList[0] = 'Advance ' + temp.power;
        }
        setState(temp);
    }

    const handleTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const temp = {...state};
        temp.type = e.target.value;
        if(temp.type === 'Character') {
            temp.power = 1;
            temp.abilityList = ['Advance 1'].concat(state.abilityList);
        } else {
            temp.power = 0;
            if(state.type === 'Character') { 
                temp.abilityList = state.abilityList.slice(1);
             }
        }
        setState(temp);
    }

    const handleFactionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const temp = {...state};
        temp.faction = e.target.value;
        setState(temp);
    }
    
    return (
        <div className="flex flex-col justify-evenly items-center
            bg-slate-100 border border-black p-2 shadow 
            h-full w-max mx-auto">
            <div className="w-40 h-40 pb-2 mx-auto flex justify-center items-center">
                <Image src={`/default_${state.type}.png`} alt="default hero image" width={200} height={200}
                    className={`border-4 rounded ${Factions[state.faction].border}`} />
            </div>
            <div className="w-full flex flex-grow justify-center p-2 border-t-2 border-yellow-700">
                <form action={formAction} id="new-card-form" name="new-card-form">
                    <div className="flex flex-col justify-between h-full space-y-2">
                        {/* Name */}
                        <div className="flex justify-between">
                            <label htmlFor="card-name" className="flex-grow underline">Card Name</label>
                            <input id="card-name" name="card-name" type="text" className="flex-grow ml-2" aria-describedby="name-error" />
                        </div>
                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.name &&
                            actionState.errors?.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please enter a name for your card.'}
                                </p>
                            ))}
                        </div>

                        {/* Type */}
                        <div className="flex justify-between">
                            <label htmlFor="type" className="flex-grow underline">Card Type</label>
                            <select id="type" name="type" className="flex-grow" 
                                onChange={handleTypeSelect} aria-describedby="type-error"> 
                                <option>Select a card type...</option>
                                <option id="Character" value="Character">Character</option>
                                <option id="event" value="Event">Event</option>
                                <option id="effect" value="Effect">Effect</option>
                            </select>
                        </div>
                        <div id="type-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.type &&
                            actionState.errors?.type.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please select a type for your card.'}
                                </p>
                            ))}
                        </div>

                        {/* Faction */}
                        <div className="flex justify-between">
                            <label htmlFor="faction" className="flex-grow underline">Faction</label>
                            <select id="faction" name="faction" className="flex-grow"
                                onChange={handleFactionSelect} aria-describedby="faction-error">
                                <option>Select a faction...</option>
                                <option id="seers" value="Seers">Seers</option>
                                <option id="bards" value="Bards">Bards</option>
                                <option id="heroes" value="Heroes">Heroes</option>
                                <option id="shadows" value="Shadows">Shadows</option>
                            </select>
                        </div>
                        <div id="faction-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.faction &&
                            actionState.errors?.faction.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please select a faction for your card.'}
                                </p>
                            ))}
                        </div>

                        {/* Cost & Power */}
                        <div className="flex justify-between">
                            <label htmlFor="cost" className="flex-grow underline">Cost</label>
                            <input id="cost" name="cost" type="number" step={1} min={1} defaultValue={1} 
                                className="w-16" aria-describedby="cost-error" />
                            <label htmlFor="power" className="flex-grow underline ml-2">Power</label>
                            <input id="power" name="power" type="number" 
                                step={1} min={0} 
                                className="w-16" 
                                onChange={handleChange}
                                value={state.power}
                                disabled={state.type != 'Character'}
                                aria-describedby="power-error"
                            />
                        </div>
                        <div id="cost-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.cost &&
                            actionState.errors?.cost.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please enter a cost for your card.'}
                                </p>
                            ))}
                        </div>
                        {state.type === "Character" && 
                        <div id="power-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.power &&
                            actionState.errors?.power.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please enter a power for your Character.'}
                                </p>
                            ))}
                        </div>}

                        {/* Abilities */}
                        <div className="flex flex-col flex-grow justify-stretch">
                            <div className="mb-2">
                                <div className="underline">Abilities</div>
                                <ul>
                                {state.abilityList.map((ability, i) => 
                                    <div className="flex justify-between p-2 pt-1" key={`ability-${i}`}>
                                        {ability}
                                        <button value={i} type="button" onClick={removeAbility}>
                                            <HiOutlineMinusCircle className="bg-slate-400 rounded-full border border-black" />
                                        </button>
                                    </div>
                                )}
                                </ul>
                            </div>
                            {(state.abilityList.length < 4) && <div className="bg-white border border-black flex-grow h-full overflow-scroll">
                                <div className="flex justify-between p-2 pt-1">
                                    <input id="ability" name="ability" 
                                        placeholder="Enter an ability here" 
                                        className="outline-none" 
                                        onChange={handleChange} 
                                        value={state.ability} />
                                    <button type="button" onClick={addAbility}><HiOutlinePlus className="bg-slate-400 rounded-full border border-black" /></button>
                                </div>
                                <div id="abilities-error"aria-live="polite" aria-atomic="true">
                                    {actionState.errors?.abilities &&
                                    actionState.errors?.abilities.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                        {'Please give your card an ability.'}
                                        </p>
                                    ))}
                                </div>
                            </div>}
                        </div>

                        {/* Hidden Inputs */}
                        <input id="image_url" name="image_url" type="hidden" value={`/default_${state.type}.png`} />
                        <input id="abilities" name="abilities" type="hidden" value={state.abilityList} />

                        {/* Buttons */}
                        <div className="flex space-x-2">
                            <button id="clear" type="button" className="border rounded shadow hover:shadow-xl flex-grow">Clear</button>
                            <button id="create" type="submit" className="border border-green-900 rounded shadow hover:shadow-xl flex-grow">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}