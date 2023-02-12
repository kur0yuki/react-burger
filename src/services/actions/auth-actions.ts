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
import {
    AUTH_ERROR,
    GET_USER_INFO,
    REFRESH_TOKEN,
    RESET_REQUEST,
    RESET_REQUEST_SAVE,
    SET_USER_INFO,
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_OUT
} from "../constants";
import {AppDispatch, AppThunk} from "../hooks";
import {TForgotCreds, TLoginCreds, TRegisterCreds, TResetCreds, TUser} from "../../utils/types";


export const signOut: AppThunk = () => (dispatch: AppDispatch) => {
    signOutRequest().then(res => {
        setCookie('accessToken', null, {expires: -1});
        setCookie('refreshToken', null, {expires: -1});
        dispatch({type: SIGN_OUT})
    }).catch(console.log)
};

export type TSignInAction = {
    type: typeof SIGN_IN
    accessToken: string
    refreshToken: string
    user: TUser
}
export type TSignInErrorAction = {
    type: typeof SIGN_IN_ERROR
}
export const signIn: AppThunk = (creds: TLoginCreds) => (dispatch: AppDispatch) => {
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
};


export const register: AppThunk = (creds: TRegisterCreds) => (dispatch: AppDispatch) => {
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
};

export type TRefreshAction = {
    type: typeof REFRESH_TOKEN
    accessToken: string
}
export const refreshToken: AppThunk = (request: AppThunk, data: any) => (dispatch: AppDispatch) => {
    refreshTokenRequest({token: getCookie("refreshToken")}).then(res => {
        setCookie('accessToken', res.accessToken, {path: '/'});
        setCookie('refreshToken', res.refreshToken, {path: '/'});
        dispatch({type: REFRESH_TOKEN, accessToken: res.accessToken});
        dispatch(request(data))
    }).catch(res => dispatch({type: AUTH_ERROR, token: true}))
};

export type TGetUserAction = {
    type: typeof GET_USER_INFO
    user: TUser
}
export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    getProfileRequest().then(res => {
        dispatch({type: GET_USER_INFO, user: res.user})
    }).catch(res => {
        if (res) {
            dispatch(refreshToken(getUser, null))
        } else {
            dispatch({type: AUTH_ERROR})
        }
    })
};

export type TSetUserAction = {
    type: typeof SET_USER_INFO
    user: TUser
}
export const setUser: AppThunk = (data: TUser & { password?: string }) => (dispatch: AppDispatch) => {
    patchProfileRequest(data).then(res => {
        dispatch({type: SET_USER_INFO, user: res.user})
    }).catch(res => {
        if (res) {
            dispatch(refreshToken(setUser, data))
        } else {
            dispatch({type: AUTH_ERROR})
        }
    })
};

export type TResetPasswordAction = {
    type: typeof RESET_REQUEST
}
export const resetPassword: AppThunk = (data: TForgotCreds) => (dispatch: AppDispatch) => {
    resetPasswordRequest(data).then(res => {
        dispatch({type: RESET_REQUEST})
    }).catch(console.log)
};

export type TResetPasswordSaveAction = {
    type: typeof RESET_REQUEST_SAVE
}

export function resetPasswordSave(data: TResetCreds) {
    return function (dispatch: AppDispatch) {
        resetPasswordSaveRequest(data).then(res => {
            dispatch({type: RESET_REQUEST_SAVE})
        }).catch(console.log)
    };
}

export type TAuthActions = TSignInAction | TSignInErrorAction |
    TRefreshAction | TGetUserAction | TSetUserAction | TResetPasswordAction | TResetPasswordSaveAction
