import {WS_CONNECTION_START_USER} from "./actions/ws-actions";
import {getCookie} from "../utils/api";

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
        let socket = null;

        return next => action => {
            const {dispatch, getState} = store;
            const {type, payload} = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                if (wsInit===WS_CONNECTION_START_USER){
                    console.log(wsUrl+getCookie('accessToken').split(' ')[1])
                    socket = new WebSocket(wsUrl+getCookie('accessToken').split(' ')[1]);
                } else {
                    socket = new WebSocket(wsUrl);
                }
            }
            if (socket) {

                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData =  JSON.parse(data)
                    if (parsedData.success===true){
                        dispatch({type: onMessage, payload: parsedData});
                    }

                };

                socket.onclose = event => {
                    dispatch({type: onClose, payload: event});
                };

                if (type === wsSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};
