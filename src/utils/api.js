import {base_url} from "./data";

const ingUrl = base_url + "ingredients"
const orderUrl = base_url +"orders"

const checkResp = (resp) => {
    if (resp.ok){
        return resp.json()
    } else {
        return Promise.reject(resp.status)
    }
};
const checkJson = (resp) => {
    if (!resp.success){
        return Promise.reject(resp.status)
    } else {
        return resp
    }
};

export function getIngredients(){
    return fetch(ingUrl).then(checkResp).then(checkJson)
}

export function getOrderDetails(body) {
    return fetch(orderUrl,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ingredients: body})
    }).then(checkResp).then(checkJson)
}
