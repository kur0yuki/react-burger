import {combineReducers} from "redux";
import {ingredientsReducer, TIngredientState} from "./ingredientsReducer";
import {burgerReducer, TBurgerState} from "./burgerReducer";
import {currentIngredient, currentOrder, TCurrentIngState, TCurrentOrderState} from "./modalReducers";
import {tokenReducer, userReducer} from "./userReducer";
import {TWsReducerState, wsReducerAllFeed, wsReducerUser} from "./wsReducers";
import {TUser} from "../../utils/types";

export type RootState = {
    contents: TBurgerState,
    ingredients: TIngredientState,
    currentIngredient: TCurrentIngState,
    currentOrder: TCurrentOrderState,
    user: TUser | null,
    tokenRefresh: boolean,
    feed: TWsReducerState
    userOrders: TWsReducerState,
};

export const rootReducer = combineReducers({
    contents: burgerReducer,
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredient,
    currentOrder: currentOrder,
    user: userReducer,
    tokenRefresh: tokenReducer,
    feed: wsReducerAllFeed,
    userOrders: wsReducerUser
});
