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
    name: string,
    email: string,
    password: string
}

export type SafeUser = {
    id: string,
    name: string,
    email: string
}

export const EmptyUser:User = {
    id: "",
    name: "",
    email: "",
    password: ""
}

export type SaleListing = {
    id: string,
    user_id: string,
    card_id: number,
    copies: number,
    price: number,
    date: Date
}

export type RichSaleListing = {
    id: string,
    user: SafeUser,
    card: Card,
    copies: number,
    price: number,
    date: Date
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

export const CardTypes = {
    Character: {
        defaultImage: '/default_Character.png'
    },
    Event: {
        defaultImage: '/default_Event.png'
    },
    Effect: {
        defaultImage: '/default_Effect.png'
    }
};