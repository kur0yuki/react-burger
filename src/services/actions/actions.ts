import {getIngredients, getOrderDetails} from "../../utils/api";
import {refreshToken} from "./auth-actions";
import {TIngredientContent, TIngredientData, TIngredientRaw} from "../../utils/types";
import {AppDispatch, AppThunk} from "../hooks";
import {
    ADD,
    ADD_AT,
    ADD_BUN,
    CHANGE_ORDER,
    CLEAR_CURRENT_INGREDIENT,
    CLEAR_ORDER,
    CLEAR_ORDER_ID,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    GET_ORDER_ID,
    REMOVE,
    SET_CURRENT_INGREDIENT
} from "../constants";

export type TAddAction = {
    type: typeof ADD,
    payload: TIngredientContent
}
export const addAction = (item: TIngredientContent): TAddAction => {
    return {
        type: ADD,
        payload: item
    }
};

export type TAddAtAction = {
    payload: { item: TIngredientContent; index: number }
    type: typeof ADD_AT
}
export const addAtAction = (index: number, item: TIngredientContent): TAddAtAction => {
    return {
        type: ADD_AT,
        payload: {item, index}
    }
};

export type TAddBunAction = {
    payload: TIngredientData
    type: typeof ADD_BUN
}
export const addBunAction = (item: TIngredientData): TAddBunAction => {
    return {
        type: ADD_BUN,
        payload: item
    }
};

export type TRemoveAction = {
    id: string
    index: number
    type: typeof REMOVE
}
export const removeAction = (index: number, id: string): TRemoveAction => {
    return {
        type: REMOVE,
        id,
        index
    }
};

export type TReorderAction = {
    payload: { dragIndex: number; index: number }
    type: typeof CHANGE_ORDER
}
export const reorderAction = (index: number, dragIndex: number): TReorderAction => {
    return {
        type: CHANGE_ORDER,
        payload: {index, dragIndex}
    }
};

export type TSetCurrentIngredientAction = {
    payload: TIngredientData
    type: typeof SET_CURRENT_INGREDIENT
}
export const setCurrentIngAction = (ing: TIngredientData): TSetCurrentIngredientAction => {
    return {
        type: SET_CURRENT_INGREDIENT,
        payload: ing
    }
};

export type TClearCurrentIngredientAction = {
    type: typeof CLEAR_CURRENT_INGREDIENT
}
export const clearCurrentIngAction: TClearCurrentIngredientAction = {
    type: CLEAR_CURRENT_INGREDIENT
};

export type TClearOrderIdAction = {
    type: typeof CLEAR_ORDER_ID
}
export const clearOrderIdAction: TClearOrderIdAction = {
    type: CLEAR_ORDER_ID
};

export type TGetIngredientsAction = {
    type: typeof GET_INGREDIENTS
}
export type TGetIngredientsSuccessAction = {
    type: typeof GET_INGREDIENTS_SUCCESS
    ingredients: Array<TIngredientRaw>
}
export type TGetIngredientsFailedAction = {
    type: typeof GET_INGREDIENTS_FAILED
}

export const getIngredientsAction: AppThunk = () =>
    (dispatch: AppDispatch) => {
        dispatch({
            type: GET_INGREDIENTS
        });
        getIngredients().then(res => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            });
        })
            .catch(er => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
                console.error(er)
            })
    };

export type TGetOrderIdAction = {
    type: typeof GET_ORDER_ID
    orderId: number | string
}
export type TClearOrderAction = {
    type: typeof CLEAR_ORDER
}
export const makeOrderAction: AppThunk = (data: Array<string>) => (dispatch: AppDispatch) => {
    getOrderDetails(data).then(res => {
        dispatch({
            type: GET_ORDER_ID,
            orderId: res.order.number
        })
    }).catch(
        err => {
            if (err) {
                dispatch(refreshToken(makeOrderAction, data))
            } else {
                dispatch({
                    type: GET_ORDER_ID,
                    orderId: 'ERROR'
                })
            }
        }
    );
    dispatch({type: CLEAR_ORDER})
};

export type TIngredientActions = TAddAction | TAddAtAction | TAddBunAction | TRemoveAction | TReorderAction |
    TSetCurrentIngredientAction | TClearCurrentIngredientAction | TClearOrderIdAction |
    TGetIngredientsAction | TGetIngredientsSuccessAction | TGetIngredientsFailedAction | TGetOrderIdAction |
    TClearOrderAction
