export const onClose = (setModal, history) => () => {
    setModal({
        showModal: false,
        modal: null,
        title: null
    });
    history.goBack()
};

export const openModal = (setModal) => (content) => {
    setModal({
        showModal: true,
        modal: content,
    })
};

export function makeInfoArray(ids, data) {
    //const ex = {icon, name, count, price}
    if (!ids||data.length===0) {return null}
    let price = 0;
    const dict = {};
    ids.forEach(id => {
        dict[id] = dict[id] ? {...dict[id], cnt: dict[id].cnt + 1} : {...data.find(ing => ing._id === id), cnt: 1};
        price += dict[id].price
    });

    //console.log(dict)
    return {dict, price}
}

export function makeIconsArray(ids, data) {
    //console.log(data)
    let price = 0;
    const icons = ids.map(id => {
        if (id===null) return null
        //not sure как сюда запихнули null но да сойдет
        const ing = data.find(ing => ing._id === id);
        //if (!ing){
            //console.log(ids)
            //console.log(id)
        //}
        price += ing.price?ing.price:0;
        return ing.image_mobile
    });
    //console.log(icons)
    icons.filter(icon => icon!==null)
    return {icons, price}
}
