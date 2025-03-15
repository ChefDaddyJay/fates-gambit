'use client';

import { GiPlayerBase, GiArrowWings } from "react-icons/gi";
import { ChangeEvent, useActionState, useState } from "react";
import { createUser, UserState } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function Form() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const initialState: UserState = {
        message: null,
        errors: {}
    };
    
    const [actionState, formAction, isPending] = useActionState(
        createUser,
        initialState
    );
    const [state, setState] = useState({
        password: "",
        repeat: "",
        match: true
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "password") {
            const pass = e.target.value;
            setState({
                password: pass,
                repeat: state.repeat,
                match: state.repeat === pass
            });
        } else {
            const rep = e.target.value;
            setState({
                password: state.password,
                repeat: rep,
                match: state.password === rep
            });
        }
    }

    return (
        <div className="flex flex-col
            bg-slate-100 border border-black p-2 shadow 
            h-max w-max mx-auto">
            <div className="w-40 h-40 pb-2 mx-auto flex justify-center items-center">
                <GiPlayerBase className={`border-4 border-black rounded h-full w-full`} />
            </div>
            <div className="w-full flex flex-grow justify-center p-2 border-t-2 border-yellow-700">
                <form action={formAction} id="signup-form" name="signup-form">
                    <div className="flex flex-col justify-start h-full space-y-2">
                        {/* Name */}
                        <div className="flex justify-between">
                            <label htmlFor="name" className="flex-grow underline">Username</label>
                            <input id="name" name="name" type="text" className="flex-shrink ml-2" aria-describedby="name-error" />
                        </div>
                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.name &&
                            actionState.errors?.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please enter a username.'}
                                </p>
                            ))}
                        </div>
                        
                        {/* Email */}
                        <div className="flex justify-between">
                            <label htmlFor="email" className="flex-grow underline">Email</label>
                            <input id="email" name="email" type="email" className="flex-shrink ml-2" aria-describedby="email-error" />
                        </div>
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.email &&
                            actionState.errors?.email.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please enter your email.'}
                                </p>
                            ))}
                        </div>

                        {/* Password */}
                        <div className="flex justify-between">
                            <label htmlFor="password" className="flex-grow underline">Password</label>
                            <input id="password" 
                                name="password" 
                                type="password" 
                                className="flex-shrink ml-2" 
                                aria-describedby="password-error" 
                                onChange={handleChange}/>
                        </div>
                        <div id="password-error" aria-live="polite" aria-atomic="true">
                            {actionState.errors?.password &&
                            actionState.errors?.password.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {'Please enter a password.'}
                                </p>
                            ))}
                        </div>

                        <div className={`${!state.match && 'bg-red-400'}`}>
                            <label htmlFor="repeat-password" className="flex-grow underline">Repeat Password</label>
                            <input id="repeat-password" 
                                name="repeat-password" 
                                type="password" 
                                className="flex-shrink ml-2" 
                                aria-describedby="repeat-password-error"
                                onChange={handleChange} />
                        </div>

                        {/* Buttons */}
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <div className="flex space-x-2">
                            <button id="sign-in" type="submit" 
                                className="border-2 border-green-900 rounded shadow p-2
                                    flex justify-center flex-grow
                                    hover:shadow-xl"
                                aria-disabled={!state.match && isPending}>
                                Sign Up <GiArrowWings className="rotate-45 ml-4 my-auto w-6 h-6
                                    border border-black rounded-full" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}