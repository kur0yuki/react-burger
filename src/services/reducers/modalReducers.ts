import {TApplicationActions} from "../hooks";
import {CLEAR_CURRENT_INGREDIENT, CLEAR_ORDER_ID, GET_ORDER_ID, SET_CURRENT_INGREDIENT} from "../constants";
import {TIngredientData} from "../../utils/types";
import {TIngredientActions} from "../actions";

export type TCurrentIngState = {
    ing: TIngredientData
} | null
const initialState: TCurrentIngState = null;
export const currentIngredient = (state = initialState, action: TIngredientActions): TCurrentIngState => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {ing: action.payload};
        case CLEAR_CURRENT_INGREDIENT:
            return null;
        default:
            return state
    }
};

export type TCurrentOrderState = {
    orderId?: number | string
} | null
const initialOrderState: TCurrentOrderState = {};
export const currentOrder = (state = initialOrderState, action: TApplicationActions): TCurrentOrderState => {
    switch (action.type) {
        case GET_ORDER_ID:
            return {orderId: action.orderId};
        case CLEAR_ORDER_ID:
            return null;
        default:
            return state
    }
};
