import {ADD, ADD_AT, ADD_BUN, CHANGE_ORDER, CLEAR_ORDER, REMOVE} from "../constants";
import {TIngredientContent, TIngredientData} from "../../utils/types";
import {TIngredientActions} from "../actions";

export type TBurgerState = {
    bun: TIngredientData & { type: 'bun' } | null
    main: Array<TIngredientContent>
}
export const burgerReducer = (state = {bun: null, main: []}, action: TIngredientActions): TBurgerState => {
    //const payload = action.payload;
    switch (action.type) {
        case ADD_BUN:
            return {...state, bun: <TIngredientData & { type: 'bun' }>action.payload};//TODO WTF
        case ADD:
            return {...state, main: [...state.main, action.payload]};
        case ADD_AT: {
            const main: Array<TIngredientContent> = [...state.main];
            main.splice(action.payload.index + 1, 0, action.payload.item);

            return {...state, main: main}
        }
        case REMOVE: {
            const main = [...state.main];
            if (main.length === 1) return {...state, main: []};
            main.splice(action.index, 1);
            return {...state, main: main};
        }
        case CLEAR_ORDER:
            return {bun: null, main: []};
        case CHANGE_ORDER://TODO: CHECK
            const main = [...state.main];
            const item = main[action.payload.dragIndex];
            if (action.payload.index === -1) {
                main.splice(action.payload.dragIndex, 1);
                return {...state, main: [item, ...main]}
            }
            if (action.payload.index > action.payload.dragIndex) {
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

