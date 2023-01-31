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
    let price = 0;
    const dict = {};
    ids.forEach(id => {
        console.log(price);
        dict[id] = dict[id] ? {...dict[id], cnt: dict[id].cnt + 1} : {...data.find(ing => ing._id === id), cnt: 1};
        price += dict[id].price
    });

    //console.log(dict)
    return {dict, price}
}

export function makeIconsArray(ids, data) {
    let price = 0;
    const icons = ids.map(id => {
        const ing = data.find(ing => ing._id === id);
        //console.log(ing.image_mobile)
        price += ing.price;
        return ing.image_mobile
    });
    //console.log(icons)
    return {icons, price}
}
