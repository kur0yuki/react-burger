import {useDispatch, useSelector} from '../services/hooks';
import {useLocation} from "react-router";
import {FC, useEffect, useMemo} from "react";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_CLOSED_USER,
    WS_CONNECTION_START,
    WS_CONNECTION_START_USER
} from "../services/constants";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import {makeInfoArray} from "../utils/utils";
import styles from './styles.module.css'
import {RootState} from "../services/reducers/rootReducer";
import {TWsReducerState} from "../services/reducers/wsReducers";

const OrderDetailsPage: FC<{ selector: keyof RootState }> = ({selector}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locations = useMemo(() => location.pathname.split('/'), []);

    const {orders, connected} = useSelector(store => store[selector]) as TWsReducerState;
    const order_id = locations[locations.length - 1];
    const {data, isLoaded} = useSelector(store => (store.ingredients));

    useEffect(() => {
        // if (data.length === 0) {
        //     dispatch(getIngredientsAction())
        // }
        if (selector === 'userOrders') {
            dispatch({type: WS_CONNECTION_START_USER})
        } else {
            dispatch({type: WS_CONNECTION_START})
        }
        console.log('OrderDetailsPage');
        return () => {
            if (selector === 'userOrders') {
                dispatch({type: WS_CONNECTION_CLOSED_USER})
            } else {
                dispatch({type: WS_CONNECTION_CLOSED})
            }
        }
    }, []);

    const order = useMemo(() => orders?.find(order => order._id === order_id), [orders]);
    const info = useMemo(() => makeInfoArray(order?.ingredients, data), [order, data]);

    useEffect(() => {
        console.log(isLoaded, connected)
    }, [isLoaded, connected]);

    return (
        <main className={styles.centered + ' mt-30'}>
            {order && info && <OrderDetails order={order} info={info}/>}
        </main>)
};

export default OrderDetailsPage
