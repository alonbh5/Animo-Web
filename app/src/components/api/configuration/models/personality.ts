export type quote = {
    title?: string;
    author?: string;
}

export type properties = {
    title?: string;
    description?: string;
    quote?: quote
}

export type Personality = {
    _id: string;
    type: string;
    descritpion?:string;
    properites?: properties[]
    link?: string;
    alias?: string;
}
