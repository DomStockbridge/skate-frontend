export enum ECategory {
    GRIND="grind",
    FLIP="flip",
    SLIDE="slide"
}

export interface ITrick {
    id: number 
    name: string
    category: ECategory
    difficulty: number
    done: boolean
}

export interface IGetTricksResponse {
    tricks?: ITrick[]
    error?: boolean
}

export interface IUpdateTrick {
    trick: ITrick
}