import {
    base_url,
    ingUrl,
    orderUrl,
    passwordResetSaveUrl,
    passwordResetUrl,
    refreshTokenUrl,
    registerUrl,
    signInUrl,
    signOutUrl,
    userUrl
} from "./data";
import {IResponse, TForgotCreds, TLoginCreds, TRegisterCreds, TResetCreds, TUser} from "./types";

const checkResp = (resp: Response) => {
    if (resp.ok) {
        return resp.json()
    } else {
        return Promise.reject(resp.status)
    }
};
const checkJson = (resp: IResponse<any>) => {
    if (!resp.success) {
        if (resp.message === 'jwt expired') {
            return Promise.reject(true)
        }
        return Promise.reject(resp.status)
    } else {
        return resp
    }
};


type TMakeRequest = (
    url: string,
    token: boolean,
    data?: any,
    method?: "GET" | "PUT" | "PATCH" | "POST" | undefined
) => Promise<any>

const makeRequest: TMakeRequest = (url, token, data, method) => {
    url = base_url + url;
    const headers = new Headers();
    if (token) {
        headers.append('Authorization', getCookie('accessToken') || 'ERROR - no token found')
    }
    //const headers: Headers = token ? {'Authorization': getCookie('accessToken')} : {};
    if (!data) {
        return fetch(url, {headers}).then(checkResp).then(checkJson)
    } else {
        //headers["Content-Type"] = "application/json";
        headers.append("Content-Type", "application/json");
        return fetch(url, {
            method: method ? method : "POST",
            headers,
            body: JSON.stringify(data)
        }).then(checkResp).then(checkJson)
    }
};

export function getIngredients() {
    return makeRequest(ingUrl, false)
}

export function getOrderDetails(body: ReadonlyArray<string>) {
    const data = {ingredients: body};
    return makeRequest(orderUrl, true, data)
}

export function signInRequest(data: TLoginCreds) {
    return makeRequest(signInUrl, false, data)
}

export function signOutRequest() {
    return makeRequest(signOutUrl, true, {token: getCookie('refreshToken')})
}

export function registerRequest(data: TRegisterCreds) {
    return makeRequest(registerUrl, false, data)
}

export function refreshTokenRequest(data: { token: string | undefined }) {
    return makeRequest(refreshTokenUrl, false, data)
}

export function resetPasswordRequest(data: TForgotCreds) {
    return makeRequest(passwordResetUrl, false, data)
}

export function resetPasswordSaveRequest(data: TResetCreds) {
    return makeRequest(passwordResetSaveUrl, false, data)
}

export function getProfileRequest() {
    return makeRequest(userUrl, true)
}

export function patchProfileRequest(data: TUser & { password?: string }) {
    return makeRequest(userUrl, true, data, 'PATCH')
}


export function setCookie(name: string, value: string | null, props: { [key: string]: any } & { expires?: number | Date | string } = {}) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && (exp as Date).toUTCString) {
        props.expires = (exp as Date).toUTCString();
    }
    value = encodeURIComponent(value || '');
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
