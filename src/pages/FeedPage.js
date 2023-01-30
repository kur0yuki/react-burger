import FeedElement from "../components/FeedElement/FeedElement";
import styles from './styles.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getIngredientsAction} from "../services/actions/actions";
import {Link} from "react-router-dom";
import {WS_CONNECTION_START} from "../services/actions/ws-actions";

export default function FeedPage() {
    const {data, isLoaded} = useSelector(store => store.ingredients);
    const {orders, connected, totalToday, total} = useSelector(store => store.feed);
    const dispatch = useDispatch();

    function makeIconsArray(ids) {
        const icons = ids.map(id => {
            const ing = data.find(ing => ing._id === id);
            //console.log(ing.image_mobile)
            return ing.image_mobile
        });
        //console.log(icons)
        return icons
    }

    useEffect(() => {
        if (data.length === 0) {
            dispatch(getIngredientsAction())
        }
        if (!connected) {
            dispatch({type: WS_CONNECTION_START})
        }
    }, [connected]);

    const ordersWIP = useMemo(() => {
        return orders.filter(order => order.status !== 'done')
    }, [orders]);
    const ordersDone = useMemo(() => {
        return orders.filter(order => order.status === 'done')
    }, [orders]);


    /* const order = {
         "ingredients": [
             "60d3b41abdacab0026a733c6",
             "60d3b41abdacab0026a733c6",
             "60d3b41abdacab0026a733c6",
             "60d3b41abdacab0026a733c6"
         ],
         "_id": "1",
         "status": "done",
         "number": 0,
         "createdAt": "2021-06-23T14:43:22.587Z",
         "updatedAt": "2021-06-23T14:43:22.603Z",
         "name": "Death Star Starship Main бургер"
     };*/

    if (!isLoaded || !connected) {
        return (<p>Try again later</p>)
    }

    return <main className={`${styles.main} p-10`}>
        <h1 className={'text text_type_main-large mb-5'}>Лента заказов</h1>
        <div className={styles.twoCols}>
            <section className={styles.scrollableWindow}>
                {orders.map(order => (<Link key={order._id} to={'/feed/' + order._id}
                                            className={`${styles.link} text text_type_main-default text_color_primary`}>
                    <FeedElement order={order} icons={makeIconsArray(order.ingredients)}/>
                </Link>))}
            </section>
            <section className={''}>
                <div className={`mb-15 ${styles.wrappable}`}>
                    {ordersDone.length>0 && <div className={styles.column}>
                        <p className={'text text_type_main-medium mb-6'}>Готовы:</p>
                        <div className={styles.col}>
                            {ordersDone.map(order => (
                                <p key={order._id} className={"text text_type_digits-default"}>{order.number}</p>))}
                        </div>
                    </div>}
                    {ordersWIP.length>0 && <div className={styles.column}>
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
    </main>
}
