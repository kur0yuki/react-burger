import {getCookie} from "../utils/api";
import {REFRESH_TOKEN} from "./actions/auth-actions";

export const socketMiddleware = (wsUrl, wsActions, tokened, refreshToken) => {
    return store => {
        let socket = null;

        return next => action => {
            const {dispatch, getState} = store;
            const {type, payload} = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                if (tokened){
                    const token = getCookie('accessToken').slice(7)
                 socket = new WebSocket(wsUrl+token);
                 //console.log(wsUrl+token)
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
                    if(tokened){
                        dispatch(refreshToken(()=>({type: wsInit})))
                    }
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData =  JSON.parse(data)
                    if (parsedData.success===true){
                        //console.log(data)
                        //console.log(parsedData)
                        dispatch({type: onMessage, payload: parsedData});
                    }

                };

                socket.onclose = event => {
                    socket.close()
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
