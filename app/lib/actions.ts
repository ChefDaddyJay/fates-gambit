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

export async function createCard(prevState: CardState, formData: FormData) { 
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

    revalidatePath('/home/');
    redirect('/home/');
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