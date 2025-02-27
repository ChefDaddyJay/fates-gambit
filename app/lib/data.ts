import postgres from "postgres";
import { Card } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function fetchCards() {
    try {
        const data = await sql<Card[]>`SELECT * FROM fates_gambit.cards`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cards');
    }
}