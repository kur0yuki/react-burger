import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import {useEffect, useMemo} from "react";
import {getIngredientsAction} from "../services/actions/actions";
import {WS_CONNECTION_START} from "../services/actions/ws-actions";
import OrderDetails from "../components/OrderDetails/OrderDetails";

const OrderDetailsPage = ({selector}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {orders, connected} = useSelector(store => store[selector]);
    const order_id = location.pathname.split('/')[2];
    const {data} = useSelector(store => (store.ingredients));

    function makeInfoArray(ids) {
        //const ex = {icon, name, count, price}
        let price = 0;
        const dict = {}
        ids.forEach(id=> {
            dict[id] = dict[id] ? {...dict.id, cnt: dict.id.cnt + 1} : {...data.find(ing => ing._id === id), count: 1}
        })

        //console.log(dict)
        return {dict, price}
    }



    useEffect(() => {
        if (data.length === 0) {
            dispatch(getIngredientsAction())
        }
        if (!connected) {
            dispatch({type: WS_CONNECTION_START})
        }
    }, []);

    const order = useMemo(() => orders.find(order => order._id === order_id), [orders]);
    const info = useMemo(()=> makeInfoArray(order?.ingredients), [order])

    console.log(info)

    return (
        <main>
            {order && <OrderDetails order={order} info={info}/>}
        </main>)
};

export default OrderDetailsPage
