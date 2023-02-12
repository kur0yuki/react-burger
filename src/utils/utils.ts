import {useHistory} from "react-router";
import {TIngredientData, TSetModal} from "./types";
import {ReactNode} from "react";

export const onClose = (setModal: TSetModal, history: ReturnType<typeof useHistory<unknown>>) => () => {
    setModal({
        showModal: false,
        modal: null,
        title: undefined
    });
    history.goBack()
};

export const openModal = (setModal: TSetModal) => (content: ReactNode) => {
    setModal({
        showModal: true,
        modal: content,
    })
};

export function makeInfoArray(ids: Array<string> | undefined, data: Array<TIngredientData>): {
    dict: Array<TIngredientData>
    price: number
} | null {
    //const ex = {icon, name, count, price}
    if (!ids || data.length === 0) {
        return null
    }
    let price = 0;
    const dict: any = {};
    ids.forEach(id => {
        dict[id] = dict[id] ? {...dict[id], cnt: dict[id].cnt + 1} : {
            ...data.find((ing) => ing._id === id),
            cnt: 1
        };
        price += dict[id].price
    });

    //console.log(dict)
    return {dict, price}
}

export function makeIconsArray(ids: Array<string>, data: Array<TIngredientData>):{icons: Array<string>; price: number} {
    //console.log(data)
    let price = 0;
    const icons = ids.map(id => {
        if (id === null) return null;
        //not sure как сюда запихнули null но да сойдет
        const ing = data.find((ing) => ing._id === id);
        //if (!ing){
        //console.log(ids)
        //console.log(id)
        //}
        price += ing?.price ? ing.price : 0;
        return ing?.image_mobile
    });
    //console.log(icons)
    icons.filter(icon => (icon));
    return {icons: <Array<string>>icons, price}
}
