import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import {useEffect, useMemo} from "react";
import {getIngredientsAction} from "../services/actions/actions";
import {WS_CONNECTION_START, WS_CONNECTION_START_USER} from "../services/actions/ws-actions";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import {makeInfoArray} from "../utils/utils";
import styles from './styles.module.css'

const OrderDetailsPage = ({selector}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locations = useMemo(()=> location.pathname.split('/'),[])

    const {orders, connected} = useSelector(store => store[selector]);
    const order_id = locations[locations.length-1];
    const {data, isLoaded} = useSelector(store => (store.ingredients));

    useEffect(() => {
        if (data.length === 0) {
            dispatch(getIngredientsAction())
        }
        if (!connected) {
            if(selector==='userOrders'){
                dispatch({type: WS_CONNECTION_START_USER})
            } else {
                dispatch({type: WS_CONNECTION_START})
            }
        }
    }, []);

    const order = useMemo(() => orders.find(order => order._id === order_id), [orders]);
    const info = useMemo(()=> makeInfoArray(order?.ingredients, data), [order, data])


    return (
        <main className={styles.centered+' mt-30'}>
            {order && <OrderDetails order={order} info={info} />}
        </main>)
};

export default OrderDetailsPage
