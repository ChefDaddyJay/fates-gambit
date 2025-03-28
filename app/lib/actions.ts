'use server';

import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import bcrypt from 'bcryptjs';
import { AuthError } from "next-auth";
import { capitalize } from "@/app/lib/utils";

const CardSchema = z.object({
    id: z.string(),
    name: z.string(),
    image_url: z.string().startsWith('/'),
    type: z.enum(['Character', 'Event', 'Effect']),
    faction: z.enum(['Seers', 'Heroes', 'Bards', 'Shadows']),
    cost: z.coerce
        .number()
        .gt(0, "Cost must be greater than 0."),
    power: z.coerce
        .number()
        .gte(0, "Power cannot be negative."),
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
    message?: string | null
}

const UserSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Please enter a username."),
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(1, "Please enter a password.")
});

const CreateUser = UserSchema.omit({id: true});

export type UserState = {
    errors?: {
        name?: string[],
        email?: string[],
        password?: string[]
    },
    message?: string | null
}

const SaleSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    cardId: z.coerce.number(),
    copies: z.coerce.number().gte(1),
    price: z.coerce.number().positive(),
    date: z.coerce.date()
})

const CreateSale = SaleSchema.omit({id: true, date: true});

export type SaleState = {
    errors?: {
        userId?: string[],
        cardId?: string[],
        copies?: string[],
        price?: string[],
        date?: string[]
    },
    message?: string | null
}

const TransferSchema = z.object({
    fromUser: z.string(),
    toUser: z.string(),
    cardId: z.string(),
    amount: z.number().gte(1)
});

const AddCard = TransferSchema.omit({fromUser: true});
//const RemoveCard = TransferSchema.omit({toUser: true});

export type TransferState = {
    errors?: {
        fromUser?: string[],
        toUser?: string[],
        cardId?: string[],
        amount?: string[],
    },
    message?: string | null
}

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const processAbilities = (type?: string, input?: string):string[] => {
    const output:string[] = [];
     if(input) {
        input.toString().split(',').forEach((a:string) => output.push(a));
     } else {
        switch(type) {
            case 'Character':
            case 'Event': output.push('Gain 1 Fate Point'); break;
            case 'Effect': output.push('Target Character gains +1 Power'); break;
        }
     }
     return output;
}

export async function createCard(
    prevState: CardState, 
    formData: FormData
) { 
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

    revalidatePath('/home/cards');
    redirect('/home/cards');
}

/*** USE AND DELETE ***
export type TempState = {
    errors?: {
        user?: string[]
    },
    message?: string | null
};
export async function giveAllCards(
    prevState: TempState,
    formData: FormData
) {
    const vData = z.object({user: z.string().uuid()})
    .safeParse({user: formData.get('user')});
    const state = prevState;
    if(!vData.success) {
        state.errors = vData.error.flatten().fieldErrors;
        state.message = 'Missing Fields. Failed to Create Card.';
        return state;
    }
    const {user} = vData.data;
    try {
        const cards = await fetchAllCards();
        Promise.all(cards.map((c) => {
            return sql`INSERT INTO fates_gambit.collections (user_id, card_id, amount)
                VALUES (${user}, ${c.id}, 1)`;
        })).then((values) => {console.log("then?")});
        console.log("here");
    } catch(error) {
        console.log('catch');
        console.log(error);
        return {
            message: "Database error: Failed to assign card collection"
        };
    }
    console.log("done");

    revalidatePath('/home/cards');
    redirect('/home/cards');
}
/*** USE AND DELETE ***/

export async function addCardToCollection(
    prevState: TransferState,
    formData: FormData
) {
    const validatedFields = AddCard.safeParse({
        toUser: formData.get('user'),
        cardId: formData.get('card'),
        amount: formData.get('amount')
    });
    const state:TransferState = prevState;

    if(!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.message = 'Missing Fields. Failed to Add Card.';
        return state;
    }

    const {toUser, cardId, amount} = validatedFields.data;

    try {
        await sql`
            INSERT INTO fates_gambit.collections (user_id, card_id, amount)
            VALUES (
                (SELECT id FROM fates_gambit.user WHERE name = ${toUser}), 
                ${cardId}, 
                ${amount}
            )
        `;
    } catch(error) {
        console.log(error);
        return {
            message: "Database Error: Failed to add card"
        };
    }

    revalidatePath('/home/cards');
    redirect('/home/cards');
}

export async function createUser(
    prevState: UserState,
    formData: FormData
) {
    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    if(!validatedFields.success) {
        const ret: UserState = {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create user."
        };
        return ret;
    }

    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
            INSERT INTO fates_gambit.users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
        `;
    } catch(error) {
        console.log(error);
        return {
            message: "Database error: Failed to create user."
        };
    }

    revalidatePath('/home/cards');
    redirect('/home/cards');
}

export async function createSale(
    prevState: SaleState,
    formData: FormData
) {
    const validatedFields = CreateSale.safeParse({
        userId: formData.get('userId'),
        cardId: formData.get('cardId'),
        copies: formData.get('copies'),
        price: formData.get('price')
    });
    const state: SaleState = prevState;

    if(!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.message = "Missing fields. Failed to create listing.";
        return state;
    }

    const {userId, cardId, copies, price} = validatedFields.data;
    
    try {
        await sql`
            INSERT INTO fates_gambit.sales (user_id, card_id, copies, price, date)
            VALUES (${userId}, ${cardId}, ${copies}, ${price * 100}, NOW())
        `;
    } catch(error) {
        console.log(error);
        return {
            message: "Database error: Failed to create listing."
        }
    }

    revalidatePath('/home/market');
    redirect('/home/market');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', formData);
    } catch(error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials.';
                default:
                    return 'Something went wrong.';    
            }
        }
        throw error;
    }
}