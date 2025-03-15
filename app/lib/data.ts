import postgres from "postgres";
import { Card } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});
const ITEMS_PER_PAGE = 20;

export async function fetchAllCards() {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const data = await sql<Card[]>`SELECT * FROM fates_gambit.cards`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cards');
    }
}

export async function fetchCardById(id: number) {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const data = await sql<Card[]>`
            SELECT * 
            FROM fates_gambit.cards 
            WHERE fates_gambit.cards.id = ${id};
        `;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch card ${id}`);
    }
}

export async function fetchCardsByName(name: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const data = await sql<Card[]>`
            SELECT * 
            FROM fates_gambit.cards 
            WHERE fates_gambit.cards.name ILIKE ${`%${name}%`}
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch card ${name}`);
    }
}

export async function fetchCardsPages(name: string) {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const data = await sql`
            SELECT COUNT(*)
            FROM fates_gambit.cards 
            WHERE fates_gambit.cards.name ILIKE ${`%${name}%`}
        `;
        const totalPages = Math.ceil(Number(data[0].count / ITEMS_PER_PAGE))
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch card ${name}`);
    }
}