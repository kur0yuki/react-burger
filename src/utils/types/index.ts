import {Dispatch, ReactNode, SetStateAction} from "react";

export type TIngType = 'bun' | 'main' | 'sauce'

export interface TUser {
    name: string
    email: string
}

export interface TIngredientRaw {
    readonly _id: string
    readonly name: string
    readonly type: TIngType
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
    readonly calories: number
    readonly price: number
    readonly image: string
    readonly image_mobile: string
    readonly image_large: string
    readonly __v: number
}

export interface TIngredientData extends TIngredientRaw {
    q: number
}

export interface TIngredientContent extends TIngredientData {
    uuid: string
}

export type TOrderRaw = {
    name: string
    order: {
        ingredients: ReadonlyArray<string>;
        _id: string
        owner: {
            name: string
            email: string
            createdAt: string
            updatedAt: string
        }
        status: string
        name: string
        createdAt: string
        updatedAt: string
        number: number
        price: number
    }
}
export type TOrder = {
    createdAt: string
    ingredients: Array<string>
    name: string
    number: number
    status: string
    updatedAt: string
    _id: string
}

export type TLoginCreds = {
    email: string;
    password: string
}
export type TForgotCreds = {
    email: string;
}
export type TResetCreds = {
    //email: string;
    password: string
    token: string
}
export type TRegisterCreds = {
    email: string;
    password: string
    name: string
}

export type TModal = {
    modal?: ReactNode
    showModal: boolean
    title?: string
}
export type TSetModal = Dispatch<SetStateAction<TModal>>
export type TOpenModal = (content: ReactNode, title?: string, id?: string) => void


export type IResponse<TKey extends string = '', TResponseBody = {}> = {
    [key in TKey]: TResponseBody
} & {
    success: boolean
    message?: string
    status?: number
}
