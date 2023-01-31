import styles from './styles.module.css'
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";
import React, {useEffect, useState} from "react";
import ScrollableList from "../components/ScrollableList/ScrollableList";
import {Link, useHistory} from "react-router-dom";
import FeedElement from "../components/FeedElement/FeedElement";
import {getIngredientsAction} from "../services/actions/actions";
import {WS_CONNECTION_START_USER} from "../services/actions/ws-actions";
import {useDispatch, useSelector} from "react-redux";
import {makeIconsArray, makeInfoArray, onClose} from "../utils/utils";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import Modal from "../components/Modal/Modal";

export default function OrderHistoryPage() {
    const {data, isLoaded} = useSelector(store => store.ingredients);
    const {orders, isTrusted} = useSelector(store => store.userOrders);
    const dispatch = useDispatch();
    const history = useHistory()
    const [modal, setModal] = useState({});
    const onOpen = (order) => ()=> setModal({modal: <OrderDetails order={order} info={makeInfoArray(order.ingredients, data)} />, showModal: true})

    useEffect(() => {
        if (data.length === 0) {
            dispatch(getIngredientsAction())
        }
        if (!isTrusted) {
            dispatch({type: WS_CONNECTION_START_USER})
        }
    }, []);

    const OrderElement = ({el}) => (
        <Link key={el._id} to={{pathname:'/profile/orders/' + el._id, state: {from: '/'}}}
              className={`${styles.link} text text_type_main-default text_color_primary`}
                onClick = {onOpen(el)}>
            <FeedElement order={el} info={makeIconsArray(el.ingredients, data)}/>
        </Link>)

    return (
        <div className={styles.profileContainer}>
            <ProfileSidebar/>
            {orders.length>0 && <ScrollableList array={orders} Element={OrderElement}/>}
            {modal?.showModal && <Modal content={modal.modal}
                                    onClose={onClose(setModal, history)}
                                    isVisible={modal.showModal}
        />}
        </div>
    )

}
