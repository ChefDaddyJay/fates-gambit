import { Card } from "@/app/lib/definitions";
import { MiniCard } from "./card-list";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { createSale, SaleState } from "@/app/lib/actions";

export default function SaleForm(
    {back, card, copies}:
    {
        back: () => void,
        card: Card,
        copies: number
    }
) {
    const userId = useSession().data?.user.id || '';
    const initialState: SaleState = {
        errors: {},
        message: null
    };
    const [state, action] = useActionState(createSale, initialState);
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="flex justify-center">
                <MiniCard current={false} card={card} />
            </div>
            <div className="flex justify-center p-2"></div>
            <form className="flex flex-col w-full space-y-2"
                action={action}>
                <input name="userId" type="hidden" value={userId} />
                <input name="cardId" type="hidden" value={card.id} />
                <div className="flex justify-between">
                    <label htmlFor="copies">Copies</label>
                    <input className="w-16 text-gray-900 text-right"
                        type="number" 
                        name="copies"
                        min={1} max={copies}
                        defaultValue={1}
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="price" className="flex-grow">Price</label>
                    $ <input className="w-16 text-gray-900 text-right"
                        type="number"
                        name="price"
                        step={0.01}
                        min={0.01}
                        defaultValue={0.01}
                    />
                </div>
                <div className="flex flex-col items-center
                    w-full max-h-min space-y-2
                    absolute bottom-0 left-1">
                        <button className="h-12 w-full
                            bg-green-500 text-gray-900 border border-black rounded
                            hover:bg-gray-300 hover:shadow-xl cursor-pointer
                            flex justify-center items-center
                        ">
                            List Sale
                        </button>
                        <button className="h-12 w-full
                            bg-gray-400 text-gray-900 border border-black rounded
                            hover:bg-gray-300 hover:shadow-xl cursor-pointer
                            flex justify-center items-center
                        " onClick={back}>
                            Back
                        </button>
                </div>
            </form>
            <div>{state.message}</div>
        </div>
    );
}