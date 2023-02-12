import {TApplicationActions} from "../hooks";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_CLOSED_USER,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_ERROR_USER,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_SUCCESS_USER,
    WS_GET_MESSAGE,
    WS_GET_MESSAGE_USER
} from "../constants";
import {TOrder} from "../../utils/types";

export type TWsReducerState = {
    connected: boolean
    orders: Array<TOrder>
    total?: number
    totalToday?: number
}
export const wsReducerAllFeed = (state = {
    connected: false,
    orders: []
}, action: TApplicationActions): TWsReducerState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {...state, connected: true};
        case WS_CONNECTION_ERROR:
        case WS_CONNECTION_CLOSED:
            return {...state, connected: false};
        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state

    }
};
export const wsReducerUser = (state = {connected: false, orders: []}, action: TApplicationActions): TWsReducerState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS_USER:
            return {...state, connected: true};
        case WS_CONNECTION_ERROR_USER:
        case WS_CONNECTION_CLOSED_USER:
            return {...state, connected: false};
        case WS_GET_MESSAGE_USER:
            return {...state, orders: action.payload.orders};
        default:
            return state

    }
};
