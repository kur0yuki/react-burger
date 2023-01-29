import {combineReducers} from "redux";
import {
    ADD,
    ADD_AT,
    ADD_BUN,
    CHANGE_ORDER,
    CLEAR_CURRENT_INGREDIENT,
    CLEAR_ORDER,
    CLEAR_ORDER_ID,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    GET_ORDER_ID,
    REMOVE,
    SET_CURRENT_INGREDIENT
} from "../actions/actions";
import {AUTH_ERROR, GET_USER_INFO, REFRESH_TOKEN, SET_USER_INFO, SIGN_IN, SIGN_OUT} from "../actions/auth-actions";


const burgerReducer = (state = {bun: null, main: []}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case ADD_BUN:
            return {...state, bun: action.payload};
        case ADD:
            return {...state, main: [...state.main, action.payload]};
        case ADD_AT: {
            const main = [...state.main];
            main.splice(action.payload.index + 1, 0, action.payload.item);

            return {...state, main: main}
        }
        case REMOVE: {
            const main = [...state.main];
            if (main.length === 1) return {...state, main: []};
            return {...state, main: main.splice(action.index, 1)};
        }
        case CLEAR_ORDER:
            return {bun: null, main: []};
        case CHANGE_ORDER:
            const main = [...state.main];
            const item = {...state.main[action.payload.dragIndex]};
            if (action.payload.index === -1) {
                main.splice(action.payload.dragIndex, 1);
                return {...state, main: [item, ...main]}
            }
            if (payload.index > payload.dragIndex) {
                main.splice(action.payload.index + 1, 0, item);
                main.splice(action.payload.dragIndex, 1)
            } else {
                main.splice(action.payload.dragIndex, 1);
                main.splice(action.payload.index + 1, 0, item)
            }

            return {...state, main: main};

        default:
            return state
    }
};

const ingredientsReducer = (state = {
    isLoaded: false,
    hasError: false,
    data: []
}, action) => {
    switch (action.type) {
        case ADD_AT:
            return {
                ...state,
                data:
                    [...state.data.map(object =>
                        object._id === action.payload.item._id ? {...object, q: object.q + 1} : object)]
            };
        case ADD_BUN:
            return {
                ...state,
                data:
                    [...state.data.map(object =>
                        object._id === action.payload._id ? {...object, q: 1} :
                            object.type === 'bun' ? {...object, q: 0} :
                                object)]
            };
        case ADD:
            return {
                ...state,
                data:
                    [...state.data.map(object =>
                        object._id === action.payload._id ? {...object, q: object.q + 1} : object)]
            };
        case REMOVE:
            return {
                ...state,
                data: state.data.map(object => object._id === action.id ? {...object, q: object.q - 1} : object)
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                hasError: false,
                data: action.ingredients.map(object => ({...object, q: 0}))
            };
        case GET_INGREDIENTS_FAILED:
            return {
                isLoaded: false,
                hasError: true,
                data: []
            };

        default:
            return state
    }
};
const currentIngredient = (state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {ing: action.payload};
        case CLEAR_CURRENT_INGREDIENT:
            return null;
        default:
            return state
    }
};

const currentOrder = (state = {}, action) => {
    switch (action.type) {
        case GET_ORDER_ID:
            return {orderId: action.orderId};
        case CLEAR_ORDER_ID:
            return null;
        default:
            return state
    }
};

const userReducer = (state = {}, action) => {
    switch(action.type){
        case SIGN_IN:
        case GET_USER_INFO:
            return action.user
        case AUTH_ERROR:
        case SIGN_OUT:
            return null
        default:
            return state
    }
}

const tokenReducer = (state='', action) => {
    switch(action.type){
        case SET_USER_INFO:
        case GET_USER_INFO:
        case AUTH_ERROR:
            return false
        case REFRESH_TOKEN:
            return true
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    contents: burgerReducer,
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredient,
    currentOrder: currentOrder,
    user: userReducer,
    tokenRefresh: tokenReducer
});
