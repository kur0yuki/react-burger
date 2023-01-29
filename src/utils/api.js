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

const checkResp = (resp) => {
    if (resp.ok) {
        return resp.json()
    } else {
        return Promise.reject(resp.status)
    }
};
const checkJson = (resp) => {
    if (!resp.success) {
        if (resp.message==='jwt expired'){
            return Promise.reject(true)
        }
        return Promise.reject(resp.status)
    } else {
        return resp
    }
};

function makeRequest(url, token, data, method) {
    url = base_url + url;
    const headers = token ? {'Authorization': getCookie('accessToken')} : {};
    if (!data) {
        return fetch(url, {headers}).then(checkResp).then(checkJson)
    } else {
        headers["Content-Type"] = "application/json";
        return fetch(url, {
            method: method ? method : "POST",
            headers,
            body: JSON.stringify(data)
        }).then(checkResp).then(checkJson)
    }
}

export function getIngredients() {
    return makeRequest(ingUrl, false)
}

export function getOrderDetails(body) {
    const data = {ingredients: body}
    return makeRequest(orderUrl, true, data)
}

export function signInRequest(data) {
    return makeRequest(signInUrl, false, data)
}

export function signOutRequest() {
    return makeRequest(signOutUrl, true, {token: getCookie('refreshToken')})
}

export function registerRequest(data) {
    return makeRequest(registerUrl, false, data)
}

export function refreshTokenRequest(data) {
    return makeRequest(refreshTokenUrl, false, data)
}

export function resetPasswordRequest(data) {
    return makeRequest(passwordResetUrl, false, data)
}

export function resetPasswordSaveRequest(data) {
    return makeRequest(passwordResetSaveUrl, false, data)
}

export function getProfileRequest() {
    return makeRequest(userUrl, true)
}

export function patchProfileRequest(data) {
    return makeRequest(userUrl, true, data, 'PATCH')
}


export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
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

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
