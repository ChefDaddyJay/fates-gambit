'use server';

import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CardSchema = z.object({
    id: z.string(),
    name: z.string(),
    image_url: z.string().startsWith('/'),
    type: z.enum(['Character', 'Event', 'Effect']),
    faction: z.enum(['Seers', 'Heroes', 'Bards', 'Shadows']),
    cost: z.coerce.number().gt(0),
    power: z.coerce.number().gte(0),
    abilities: z.string().array()
});

const CreateCard = CardSchema.omit({id: true});

export type CardState = {
    errors?: {
        name?: string[],
        image_url?: string[],
        type?: string[],
        faction?: string[],
        cost?: string[],
        power?: string[],
        abilities?: string[]
    },
    message?: string | null,
}

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const processAbilities = (type?: string, input?: string):string[] => {
    const output:string[] = [];
     if(input) {
        input.toString().split(',').forEach((a:string) => output.push(a));
     } else {
        switch(type) {
            case 'character':
            case 'event': output.push('Gain 1 Fate Point'); break;
            case 'effect': output.push('Target Character gains +1 Power'); break;
        }
     }
     return output;
}

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase().concat(str.slice(1));
}

export async function createCard(prevState: CardState, formData: FormData) { 
    console.log('create');
    const validatedFields = CreateCard.safeParse({
        name: formData.get('card-name'),
        image_url: formData.get('image_url'),
        type: formData.get('type'),
        faction: formData.get('faction'),
        cost: formData.get('cost'),
        power: formData.get('power'),
        abilities: processAbilities(formData.get('type')?.toString(), formData.get('abilities')?.toString())
    });
    const state:CardState = prevState;

    if(!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.message = 'Missing Fields. Failed to Create Card.';
        console.log(state);
        return state;
    }

    const {name, image_url, type, faction, cost, power, abilities} = 
        validatedFields.data;

    try {
        await sql`
            INSERT INTO fates_gambit.cards (name, image_url, type, faction, cost, power, abilities)
            VALUES (${name}, ${image_url}, ${capitalize(type)}, ${capitalize(faction)}, ${cost}, ${power}, ${abilities})
        `;
    } catch(error) {
        console.log(error);
        return {
            message: "Database Error: Failed to create card"
        };
    }

    revalidatePath('/cards');
    redirect('/cards');
}