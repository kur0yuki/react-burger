import styles from './styles.module.css'
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";
import React, {useEffect} from "react";
import ScrollableList from "../components/ScrollableList/ScrollableList";
import {Link} from "react-router-dom";
import FeedElement from "../components/FeedElement/FeedElement";
import {getIngredientsAction} from "../services/actions/actions";
import {WS_CONNECTION_START_USER} from "../services/actions/ws-actions";
import {useDispatch, useSelector} from "react-redux";

export default function OrderHistoryPage() {
    const {data, isLoaded} = useSelector(store => store.ingredients);
    const {orders, isTrusted} = useSelector(store => store.userOrders);
    const dispatch = useDispatch();


    useEffect(() => {
        if (data.length === 0) {
            dispatch(getIngredientsAction())
        }
        if (!isTrusted) {
            dispatch({type: WS_CONNECTION_START_USER})
        }
    }, []);

    function makeInfoArray(ids) {
        let price = 0;
        const icons = ids.map(id => {
            const ing = data.find(ing => ing._id === id);
            //console.log(ing.image_mobile)
            price+=ing.price
            return ing.image_mobile
        });
        //console.log(icons)
        return {icons, price}
    }
    const OrderElement = ({el}) => (
        <Link key={el._id} to={'/profile/orders/' + el._id}
              className={`${styles.link} text text_type_main-default text_color_primary`}>
            <FeedElement order={el} info={makeInfoArray(el.ingredients)}/>
        </Link>)

    return (
        <div className={styles.profileContainer}>
            <ProfileSidebar/>
            {orders.length>0 && <ScrollableList array={orders} Element={OrderElement}/>}
        </div>
    )

}
