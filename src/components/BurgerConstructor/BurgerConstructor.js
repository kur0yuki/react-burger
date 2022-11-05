import React from 'react';
import styles from './BurgerConstructor.module.css'
import appStyles from '../App/App.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingType} from "../../utils/data";
import PropTypes from 'prop-types';
import Order from "../Order/Order";

function BurgerConstructor(props) {
    return (<section className={`${styles.BurgerConstructor}`}>
        <ConstructorElement type="top"
                            isLocked={true}
                            text={props.bun.name + " (верх)"}
                            price={props.bun.price}
                            thumbnail={props.bun.image_mobile}/>
        <div className={styles.scrollableWindow}>
            {props.mains.map(ing =>
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
                            text={props.bun.name + " (низ)"}
                            price={props.bun.price}
                            thumbnail={props.bun.image_mobile}/>
        <div className={`${appStyles.row} mt-10 `}>
            <div className={`${appStyles.price} mr-10`}>
                <p className='text text_type_digits-medium'>{props.mains.reduce((prev, el) => prev + el.price, 0)}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <Button type="primary" size="medium" htmlType="submit"
                    onClick={() => {
                        props.openModal(<Order orderId="034536"/>)
                    }}>
                Оформить заказ
            </Button>
        </div>
    </section>)
}

BurgerConstructor.propTypes = {
    bun: ingType,
    mains: PropTypes.arrayOf(ingType),
    openModal: PropTypes.func.isRequired
};
export default BurgerConstructor;
