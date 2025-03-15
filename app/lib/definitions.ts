export type Card = {
    id: number,
    name: string,
    image_url: string,
    type: 'Character' | 'Event' | 'Effect',
    faction: string,
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

export const EmptyCard:Card = {
    id: 0,
    name: "Empty",
    image_url: "/default_Character.png",
    type: 'Character',
    faction: "Heroes",
    cost: 0,
    power: 0,
    abilities: []
}

export type User = {
    id: string,
    email: string,
    password: string,
    player_id: string
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

export const Factions: {
    [key: string]: 
    {border: string, text: string}
} = {
    Seers: {
        border: "border-blue-700",
        text: "text-blue-700"
    },
    Heroes: {
        border: "border-orange-500",
        text: "text-orange-700"
    },
    Bards: {
        border: "border-green-700",
        text: "text-green-700"
    },
    Shadows: {
        border: "border-purple-700",
        text: "text-purple-700"
    }
};