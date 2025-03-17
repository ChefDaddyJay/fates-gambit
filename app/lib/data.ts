import postgres from "postgres";
import { Card } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});
const ITEMS_PER_PAGE = 10;

export async function fetchAllCards() {
    try {
        const data = await sql<Card[]>`SELECT * FROM fates_gambit.cards`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cards');
    }
}

export async function fetchCardById(id: number) {
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

export async function fetchFilteredCards(
        name: string,
        activeFactions: string,
        activeTypes: string,
        currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const factions = activeFactions.length > 0 
        ? activeFactions.split(',')
        : [];
    const types = activeTypes.length > 0
        ? activeTypes.split(',')
        : [];
    const select = sql`SELECT * FROM fates_gambit.cards`;
    const count = sql`SELECT COUNT(*) FROM fates_gambit.cards`;
    const limit = sql`LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`;
    const query = sql`
        WHERE name ILIKE ${`%${name}%`}
        ${
            factions.length > 0
                ? factions.map((f, i) => {
                    if(factions.length === 1) 
                        return sql`AND faction = ${f}::fates_gambit.faction`;
                    else if(i === 0) 
                        return sql`AND (faction = ${f}::fates_gambit.faction`;
                    else if(i === factions.length - 1)
                        return sql`OR faction = ${f}::fates_gambit.faction)`;
                    else
                        return sql`OR faction = ${f}::fates_gambit.faction`;
                }) : sql``
        }
        ${
            types.length > 0
                ? types.map((t, i) => {
                    if(types.length === 1) 
                        return sql`AND type = ${t}::fates_gambit.card_type`;
                    else if(i === 0) 
                        return sql`AND (type = ${t}::fates_gambit.card_type`;
                    else if(i === types.length - 1)
                        return sql`OR type = ${t}::fates_gambit.card_type)`;
                    else
                        return sql`OR type = ${t}::fates_gambit.card_type`;
                }) : sql``
        }
        `;

    try {
        const data = await sql<Card[]>`
            ${select}
            ${query}
            ${limit}
        `;
        const pages = await sql`${count} ${query}`;
        
        return {
            cards: data,
            pages: Math.ceil(Number(pages[0].count / ITEMS_PER_PAGE))
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch card ${name}`);
    }
}

export async function fetchCardsPages(name: string) {
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