import {getIngredients, getOrderDetails} from "../../utils/api";


export const ADD = 'ADD';
export const addAction = item => {
    return{
        type: ADD,
        payload: item
    }
}
export const ADD_AT = 'ADD_AT';
export const addAtAction = (index, item) => {
    return{
        type: ADD_AT,
        payload: {item, index}
    }
}
export const ADD_BUN = 'ADD_BUN'
export const addBunAction = item => {
    return{
        type: ADD_BUN,
        payload: item
    }
}

export const REMOVE = 'REMOVE';
export const removeAction = (index, id) => {
    return{
        type: REMOVE,
        id,
        index
    }
}

export const CHANGE_ORDER = 'CHANGE_ORDER';
export const reorderAction = (index, dragIndex) => {
    return{
        type: CHANGE_ORDER,
        payload: {index, dragIndex}
    }
}

export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const setCurrentIngAction = ing => {
    return{
        type: SET_CURRENT_INGREDIENT,
        payload: ing
    }
}
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';
export const clearCurrentIngAction = {
    type: CLEAR_CURRENT_INGREDIENT
}

export const GET_ORDER_ID = 'GET_ORDER_ID';
export const CLEAR_ORDER_ID = 'CLEAR_ORDER_ID';
export const clearOrderIdAction = {
    type: CLEAR_ORDER_ID
}


export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export function getIngredientsAction() {
    return function (dispatch) {
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
    }
}

export function makeOrderAction(data){
    return function (dispatch) {
        getOrderDetails(data).then(res => {
            dispatch({
                type: GET_ORDER_ID,
                orderId: res.order.number
            })
        })
    }
}
