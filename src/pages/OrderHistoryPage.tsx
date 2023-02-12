import styles from './styles.module.css'
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";
import React, {FC, useEffect, useState} from "react";
import ScrollableList from "../components/ScrollableList/ScrollableList";
import {Link, useHistory, useParams} from "react-router-dom";
import FeedElement from "../components/FeedElement/FeedElement";
import {WS_CONNECTION_CLOSED_USER, WS_CONNECTION_START_USER} from "../services/constants";
import {useDispatch, useSelector} from "../services/hooks";
import {makeIconsArray, makeInfoArray, onClose} from "../utils/utils";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import Modal from "../components/Modal/Modal";
import {TModal, TOrder} from "../utils/types";

export default function OrderHistoryPage() {
    const {data, isLoaded} = useSelector(store => store.ingredients);
    const {orders} = useSelector(store => store.userOrders);
    const dispatch = useDispatch();
    const history = useHistory();
    const id = useParams<{ id: string }>()?.id;
    const [modal, setModal] = useState<TModal>({showModal: false});
    const onOpen = (order: TOrder) => () => setModal({
        modal: <OrderDetails order={order} info={makeInfoArray(order.ingredients, data)}/>,
        showModal: true
    });

    useEffect(() => {
        // if (data.length === 0) {
        //     dispatch(getIngredientsAction())
        // }
        console.log('OrderHistoryPage');
        dispatch({type: WS_CONNECTION_START_USER});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED_USER})
        }
    }, []);

    useEffect(() => {
        if (id && isLoaded && orders && orders.length > 0) {
            const chosenOrder = orders.find(order => order._id === id);
            if (chosenOrder)
                onOpen(chosenOrder)()//TODO check
        }
        console.log(id, isLoaded, orders.length)
    }, [data, orders]);

    const OrderElement: FC<{ el: TOrder }> = ({el}) => (
        <Link key={el._id} to={{pathname: '/profile/orders/' + el._id, state: {from: '/profile/orders'}}}
              className={`${styles.link} text text_type_main-default text_color_primary`}
              onClick={onOpen(el)}>
            <FeedElement order={el} info={makeIconsArray(el.ingredients, data)}/>
        </Link>);

    return (
        <div className={styles.profileContainer}>
            <ProfileSidebar/>
            {orders.length > 0 && isLoaded && <ScrollableList array={orders} Element={OrderElement}/>}
            {modal?.showModal && <Modal content={modal.modal}
                                        onClose={onClose(setModal, history)}
                                        isVisible={modal.showModal} title={''}
            />}
        </div>
    )

}
