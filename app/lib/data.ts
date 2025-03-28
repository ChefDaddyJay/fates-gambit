import postgres from "postgres";
import { Card, RichSaleListing, SafeUser, SaleListing } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

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

export async function fetchCardsByName(name: string) {
    try {
        const data = await sql<Card[]>`
            SELECT * 
            FROM fates_gambit.cards 
            WHERE fates_gambit.cards.name ILIKE ${`%${name}%`}
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
    other: string,
    userId: string
) {
    const factions = activeFactions.length > 0 
        ? activeFactions.split(',')
        : [];
    const types = activeTypes.length > 0
        ? activeTypes.split(',')
        : [];
    const owned = other.length > 0
        ? other.split(',')
        : [];
    const query = sql`
        SELECT * FROM fates_gambit.cards
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
        ${
            userId !== '' && owned.includes('Owned')
                ? sql`AND id IN (
                    SELECT card_id FROM fates_gambit.collections
                    WHERE user_id = ${userId}
                    ${owned.includes('Multiples') ? sql`AND copies > 1` : sql``})`
                : sql``
        }
        ${
            userId !== '' && owned.includes('Unowned')
                ? sql`AND id NOT IN (
                    SELECT card_id FROM fates_gambit.collections
                    WHERE user_id = ${userId})`
                : sql``
        }
    `;

    try {
        const data = await sql<Card[]>`${query}`;
        
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch card ${name}`);
    }
}

export async function fetchCopies(
    userId: string,
    cardId: number 
) {
    const copies = await sql<{copies: number}[]>`SELECT copies FROM fates_gambit.collections
        WHERE user_id = ${userId} 
        AND card_id = ${cardId}
    `;
    return copies[0]?.copies;
}

export async function fetchListings() {
    try {
        const listings = await sql<SaleListing[]>`
            SELECT * FROM fates_gambit.sales
        `;
        return listings;
    } catch(error) {
        console.log("Database Error: " + error);
        throw new Error("Failed to fetch listings.");
    }
}

export async function fetchListingById(id: string) {
    try {
        const offer = await sql<SaleListing[]>`
            SELECT * FROM fates_gambit.sales
            WHERE id = ${id}
        `;
        return offer[0];
    } catch(error) { 
        console.log("Database Error: " + error);
        throw new Error("Failed fo fetch offer " + id);
    }
}

export async function fetchSafeUserByID(id: string) {
    try {
        const user = await sql`
            SELECT (id, name, email) 
            FROM fates_gambit.users
            WHERE fates_gambit.users.id = ${id}
        `;
        return parseSafeUser(user[0].row.slice(1, -1).split(','));
    } catch(error) { 
        console.log("Database Error: " + error);
        throw new Error("Failed fo fetch user " + id);
    }
}

export function parseSafeUser(row: string[]) {
    const [id, name, email] = [...row];
    const user: SafeUser = {
        id: id,
        name: name,
        email: email
    };
    return user;
}

export async function buildRichListing(listing: SaleListing) {
    const user = await fetchSafeUserByID(listing.user_id);
    const card = await fetchCardById(listing.card_id);
    const richListing: RichSaleListing = {
        id: listing.id,
        user: user,
        card: card,
        copies: listing.copies,
        price: listing.price,
        date: listing.date
    };
    return richListing;
}