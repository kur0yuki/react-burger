import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {RootState} from "./reducers/rootReducer";
import {store} from "../index";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk/es/types";
import {TAuthActions, TIngredientActions} from "./actions";

export type TApplicationActions = TAuthActions | TIngredientActions | any

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

