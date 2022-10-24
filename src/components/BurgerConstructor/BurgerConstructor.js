import React from 'react';
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import styles from './BurgerConstructor.module.css'
import appStyles from '../../App.module.css'
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerConstructor extends React.Component {
    render() {
        return (<section className={`${styles.BurgerConstructor}`}>
            <ConstructorIngredient bunType="top" {...this.props.bun} />
            <div className={styles.scrollableWindow}>
                {this.props.mains.map(ing =>
                    (<ConstructorIngredient key={ing.id} {...ing} />)
                )}
            </div>
            <ConstructorIngredient bunType="bottom" {...this.props.bun} />
            <div className={`${appStyles.row} mt-10 `}>
                <div className={`${appStyles.price} mr-10`}>
                    <p className='text text_type_digits-medium'>{this.props.mains.reduce((prev, el) =>prev+el.price, 0)}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
                <Button  type="primary" size="medium">Оформить заказ</Button>
            </div>
        </section>)
    }
}
export default BurgerConstructor;