export type Card = {
    id: string,
    name: string,
    image_url: string,
    type: 'character' | 'event' | 'effect',
    faction: 'seers' | 'bards' | 'heroes' | 'shadows',
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