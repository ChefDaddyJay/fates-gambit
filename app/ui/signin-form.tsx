'use client';

import { GiPlayerBase, GiArrowWings } from "react-icons/gi";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";

export default function Form() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <div className="flex flex-col
            bg-slate-100 border border-black p-2 shadow 
            h-max w-max mx-auto">
            <div className="w-40 h-40 pb-2 mx-auto flex justify-center items-center">
                <GiPlayerBase className={`border-4 border-black rounded h-full w-full`} />
            </div>
            <div className="w-full flex flex-grow justify-center p-2 border-t-2 border-yellow-700">
                <form action={formAction} id="signin-form" name="signin-form">
                    <div className="flex flex-col justify-start h-full space-y-2">
                        {/* Email */}
                        <div className="flex justify-between">
                            <label htmlFor="email" className="flex-grow underline">Email</label>
                            <input id="email" name="email" type="email" className="flex-shrink ml-2" aria-describedby="email-error" />
                        </div>

                        {/* Password */}
                        <div className="flex justify-between">
                            <label htmlFor="password" className="flex-grow underline">Password</label>
                            <input id="password" name="password" type="password" className="flex-shrink ml-2" aria-describedby="password-error" />
                        </div>

                        {/* Buttons */}
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <div className="flex space-x-2">
                            <button id="sign-in" type="submit" 
                                className="border-2 border-green-900 rounded shadow p-2
                                    flex justify-center flex-grow
                                    hover:shadow-xl"
                                aria-disabled={isPending}>
                                Log in <GiArrowWings className="rotate-45 ml-4 my-auto w-6 h-6
                                    border border-black rounded-full" />
                            </button>
                        </div>

                        <div id="error" aria-live="polite" aria-atomic="true">
                            {errorMessage && (
                                <>
                                    <p className="text-sm text-red-500">
                                        {errorMessage}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}