import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_CLOSED_USER,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_ERROR_USER,
    WS_CONNECTION_START,
    WS_CONNECTION_START_USER,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_SUCCESS_USER,
    WS_GET_MESSAGE,
    WS_GET_MESSAGE_USER,
    WS_SEND_MESSAGE
} from "../constants";

export type TWsActions = {
    wsInit: string
    wsSendMessage: string
    onOpen: string
    onClose: string
    onError: string
    onMessage: string
}
export const wsActions: TWsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export const wsActionsUser: TWsActions = {
    wsInit: WS_CONNECTION_START_USER,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS_USER,
    onClose: WS_CONNECTION_CLOSED_USER,
    onError: WS_CONNECTION_ERROR_USER,
    onMessage: WS_GET_MESSAGE_USER
};

