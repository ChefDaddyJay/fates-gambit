export type Card = {
    id: string,
    name: string
    cardType: 'character' | 'event' | 'effect',
    faction: 'seers' | 'bards' | 'heroes' | 'shadows',
    image_url: string,
    base_advancement?: number,
    abilities: string[]
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