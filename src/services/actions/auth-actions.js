import {
    getCookie,
    getProfileRequest,
    patchProfileRequest,
    refreshTokenRequest,
    registerRequest,
    resetPasswordRequest,
    resetPasswordSaveRequest,
    setCookie,
    signInRequest,
    signOutRequest
} from "../../utils/api";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_REQUEST_SAVE = 'RESET_REQUEST_SAVE';

export function signOut() {
    return function (dispatch) {
        signOutRequest().then(res => {
            setCookie('accessToken', null, {expires: -1})
            setCookie('refreshToken', null,{expires: -1})
            dispatch({type: SIGN_OUT})
        }).catch(console.log)
    }
}

export function signIn(creds) {
    return function (dispatch) {
        signInRequest(creds).then(res => {
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
            dispatch({
                type: SIGN_IN,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                user: res.user
            })
        }).catch(res => dispatch({
            type: SIGN_IN_ERROR,
        }))
    }
}

export function register(creds) {
    return function (dispatch) {
        registerRequest(creds).then(res => {
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
            dispatch({
                type: SIGN_IN,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                user: res.user
            })
        }).catch(res => dispatch({
            type: SIGN_IN_ERROR,
        }))
    }

}

export function refreshToken(request) {
    return function (dispatch) {
        refreshTokenRequest({token: getCookie("refreshToken")}).then(res => {
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
            dispatch({type: REFRESH_TOKEN, accessToken: res.accessToken})
            dispatch(request())
        }).catch(res => dispatch({type: AUTH_ERROR, token: true}))
    }
}

export function getUser() {
    return function (dispatch) {
        getProfileRequest().then(res => {
            dispatch({type: GET_USER_INFO, user: res.user})
        }).catch(res => {
            if (res) {
                dispatch(refreshToken(getUser))
            } else {
                dispatch({type: AUTH_ERROR})
            }
        })
    };
}

export function setUser(data) {
    return function (dispatch) {
        patchProfileRequest(data).then(res => {
            dispatch({type: SET_USER_INFO, user: res.user})
        }).catch(res => {
            if (res) {
                dispatch(refreshToken(setUser))
            } else {
                dispatch({type: AUTH_ERROR})
            }
        })
    };
}

export function resetPassword(data) {
    return function (dispatch) {
        resetPasswordRequest(data).then(res => {
            dispatch({type: RESET_REQUEST})
        }).catch(console.log)
    };
}

export function resetPasswordSave(data) {
    return function (dispatch) {
        resetPasswordSaveRequest(data).then(res => {
            dispatch({type: RESET_REQUEST_SAVE})
        }).catch(console.log)
    };
}
