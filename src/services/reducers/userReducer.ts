import {TApplicationActions} from "../hooks";
import {AUTH_ERROR, GET_USER_INFO, REFRESH_TOKEN, SET_USER_INFO, SIGN_IN, SIGN_OUT} from "../constants";
import {TUser} from "../../utils/types";

type TUserState = TUser | null
export const userReducer = (state = null, action: TApplicationActions): TUserState => {
    switch (action.type) {
        case SIGN_IN:
        case GET_USER_INFO:
            return action.user;
        case AUTH_ERROR:
        case SIGN_OUT:
            return null;
        default:
            return state
    }
};

export const tokenReducer = (state = false, action: TApplicationActions): boolean => {
    switch (action.type) {
        case SET_USER_INFO:
        case GET_USER_INFO:
        case AUTH_ERROR:
            return false;
        case REFRESH_TOKEN:
            return true;
        default:
            return state
    }
};
