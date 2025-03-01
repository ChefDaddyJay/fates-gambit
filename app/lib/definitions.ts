export type Card = {
    id: string,
    name: string,
    image_url: string,
    type: 'Character' | 'Event' | 'Effect',
    faction: 'Seers' | 'Bards' | 'Heroes' | 'Shadows',
    cost: number,
    power: number,
    abilities: string[]
}

export type CardEntry = {
    ability: string,
    abilityList: string[]
    power: number,
    type: string,
    faction: string
}

export type Player = {
    id: string,
    name: string,
    collection: Collection,
    decks: {
        name: string,
        cards: Collection
    }[]
}

export type Collection = {
    id: string,
    player_id: string,
    cards: [
        {
            card_id: string,
            copies: number
        }
    ]
}

export const factionBorder = (faction: string) => {
    switch (faction) {
        case 'Seers': return 'border-blue-700';
        case 'Heroes': return 'border-orange-500';
        case 'Bards': return 'border-green-500';
        case 'Shadows': return 'border-purple-500';
        default: return 'border-red-500';
    }
}

export const factionText = (faction: string) => {
    switch (faction) {
        case 'Seers': return 'text-blue-700';
        case 'Heroes': return 'text-orange-500';
        case 'Bards': return 'text-green-700';
        case 'Shadows': return 'text-purple-500';
        default: return 'text-red-500';
    }
}