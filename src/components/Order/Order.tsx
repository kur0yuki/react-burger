import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useSelector} from "../../services/hooks";
import {FC} from "react";

const Order: FC = () => {
    const {orderId} = useSelector(store => ({
        orderId: store?.currentOrder?.orderId
    }));
    return (
        <>
            <p className='text text_type_digits-large mt-4 mb-8'>{orderId}</p>
            <p className='text text_type_main-default mb-15'>идентификатор заказа</p>
            <CheckMarkIcon type={"primary"}/>
            <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
            <p className='text text_color_inactive text_type_main-default mb-15'>Дождитесь готовности на орбитальной
                станции</p>
        </>
    )
};

export default Order;
