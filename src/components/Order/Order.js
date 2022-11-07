import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

function Order(props) {
    return (
        <>
            <p className='text text_type_digits-large mt-4 mb-8'>{props.orderId}</p>
            <p className='text text_type_main-default mb-15'>идентификатор заказа</p>
            <CheckMarkIcon type={"primary"}/>
            <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
            <p className='text text_color_inactive text_type_main-default mb-15'>Дождитесь готовности на орбитальной
                станции</p>
        </>
    )
}

Order.propTypes = {
    orderId: PropTypes.string.isRequired
};

export default Order;
