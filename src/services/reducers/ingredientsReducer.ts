import {TIngredientData} from "../../utils/types";
import {ADD, ADD_AT, ADD_BUN, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, REMOVE} from "../constants";
import {TIngredientActions} from "../actions";

export type TIngredientState = {
    isLoaded: boolean;
    hasError: boolean;
    data: Array<TIngredientData>
}
const inredientsInitalState: TIngredientState = {
    isLoaded: false,
    hasError: false,
    data: []
};

export const ingredientsReducer = (state = inredientsInitalState, action: TIngredientActions): TIngredientState => {
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
