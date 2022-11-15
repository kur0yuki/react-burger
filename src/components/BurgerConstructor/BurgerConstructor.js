import React, {useContext, useMemo, useReducer} from 'react';
import styles from './BurgerConstructor.module.css'
import appStyles from '../App/App.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import Order from "../Order/Order";
import {DataContext} from "../../contexts/dataContext";
import {getOrderDetails} from "../../utils/api";

function BurgerConstructor(props) {
    const data=useContext(DataContext)

    const bun = useMemo(()=> data.find(el => el.type === "bun"), [data])
    const mains= useMemo(()=> data.filter(el => el.type !== "bun"),[data])
    const fullIngredientArray = useMemo(getIngArray, [bun, mains])

    function changePrice(price, action){
        switch(action.type){
            case "add": return price+action.price
            case "remove": return price-action.price
            default: return price
        }

    }

    const [price] = useReducer(changePrice, 0, ()=>{
        return (bun.price*2+mains.reduce((prev, el) => prev + el.price, 0))
    })

    function getIngArray(){
        return [bun._id].concat(mains.map(ing=> ing._id)).concat(bun._id)
    }

    function onOrder(){
        return getOrderDetails(fullIngredientArray)
            .then(res => {
                props.openModal(<Order orderId={res.order.number} />)
            })
    }

    return (<section className={`${styles.BurgerConstructor}`}>
        <ConstructorElement type="top"
                            isLocked={true}
                            text={bun.name + " (верх)"}
                            price={bun.price}
                            thumbnail={bun.image_mobile}/>
        <div className={styles.scrollableWindow}>
            {mains.map(ing =>
                (<article className={styles.article} key={ing._id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={ing.name}
                        price={ing.price}
                        thumbnail={ing.image_mobile}/>
                </article>)
            )}
        </div>
        <ConstructorElement type="bottom"
                            isLocked={true}
                            text={bun.name + " (низ)"}
                            price={bun.price}
                            thumbnail={bun.image_mobile}/>
        <div className={`${appStyles.row} mt-10 `}>
            <div className={`${appStyles.price} mr-10`}>
                <p className='text text_type_digits-medium'>{price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <Button type="primary" size="medium" htmlType="submit"
                    onClick={onOrder} >
                Оформить заказ
            </Button>
        </div>
    </section>)
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
};
export default BurgerConstructor;
