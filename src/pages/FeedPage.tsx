import FeedElement from "../components/FeedElement/FeedElement";
import styles from './styles.module.css'
import {useDispatch, useSelector} from "../services/hooks";
import React, {FC, useEffect, useMemo, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../services/constants";
import Modal from "../components/Modal/Modal";
import {makeIconsArray, makeInfoArray, onClose} from "../utils/utils";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import {TModal} from "../utils/types";

const FeedPage: FC = () => {
    const {data, isLoaded} = useSelector(store => store.ingredients);
    const {orders, connected, totalToday, total} = useSelector(store => store.feed);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [modal, setModal] = useState<TModal>({showModal: false});

    const onOpen = (order: any) => () => setModal({
        modal: <OrderDetails order={order} info={makeInfoArray(order.ingredients, data)}/>,
        showModal: true
    });

    useEffect(() => {
        // if (data.length === 0) {
        //     dispatch(getIngredientsAction())
        // }
        //if (!connected) {
        dispatch({type: WS_CONNECTION_START});
        //}

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, []);

    useEffect(() => {
        const orderChosen = location.pathname.split('/');
        if (orders.length > 0 && orderChosen.length === 3) {
            onOpen(orders.find(order => order._id === orderChosen[2]))()
        }
    }, [location, orders]);

    const ordersWIP = useMemo(() => {
        return orders.filter(order => order.status !== 'done')
    }, [orders]);
    const ordersDone = useMemo(() => {
        return orders.filter(order => order.status === 'done')
    }, [orders]);


    if (!isLoaded || !connected) {
        return (<p>Try again later</p>)
    }

    return (
        <main className={`${styles.centered} p-10`}>
            <h1 className={'text text_type_main-large mb-5'}>Лента заказов</h1>
            <div className={styles.twoCols}>
                <section className={styles.scrollableWindow}>
                    {orders.map(order => (
                        <Link key={order._id} to={{pathname: '/feed/' + order._id, state: {from: '/feed'}}}
                              className={`${styles.link} text text_type_main-default text_color_primary`}
                              onClick={onOpen(order)}>
                            <FeedElement order={order} info={makeIconsArray(order.ingredients, data)}/>
                        </Link>))}
                </section>
                <section className={''}>
                    <div className={`mb-15 ${styles.wrappable}`}>
                        {ordersDone.length > 0 && <div className={styles.column}>
                            <p className={'text text_type_main-medium mb-6'}>Готовы:</p>
                            <div className={styles.col}>
                                {ordersDone.map(order => (
                                    <p key={order._id} className={"text text_type_digits-default"}>{order.number}</p>))}
                            </div>
                        </div>}
                        {ordersWIP.length > 0 && <div className={styles.column}>
                            <p className={'text text_type_main-medium mb-6'}>В работе:</p>
                            <div className={styles.col}>
                                {ordersWIP.map(order => (
                                    <p key={order._id} className={"text text_type_digits-default"}>{order.number}</p>))}

                            </div>
                        </div>}

                    </div>
                    <p className={'text text_type_main-medium'}>Выполнено за все время:</p>
                    <p className={'text text_type_digits-large mb-15'}>{total}</p>

                    <p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
                    <p className={'text text_type_digits-large mb-15'}>{totalToday}</p>

                </section>
            </div>
            {modal?.showModal && <Modal content={modal.modal}
                                        onClose={onClose(setModal, history)}
                                        isVisible={modal.showModal} title={''}
            />}
        </main>)
};

export default FeedPage
