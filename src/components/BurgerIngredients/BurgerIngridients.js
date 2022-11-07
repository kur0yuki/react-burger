import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngridients.module.css'
import IngredientCard from "../IngredientCard/IngredientCard";
import {ingType} from "../../utils/data";
import PropTypes from "prop-types";

function BurgerIngridients(props) {
    return (<div className={`${styles.BurgerIngridients} pt-10`}>
        <h2 className='text text_type_main-large'>Соберите бургер</h2>
        <div className={`${styles.tabs} mb-10 mt-5`}>
            <Tab active={true} value={0} onClick={0}><p className='text text_type_main-default'>Булки</p></Tab>
            <Tab active={false} value={0} onClick={0}><p className='text text_type_main-default'>Соусы</p></Tab>
            <Tab active={false} value={0} onClick={0}><p className='text text_type_main-default'>Котлетки</p></Tab>
        </div>
        <div className={styles.ingridientsWindow}>
            <h2 className={`${styles.type} mb-6 text text_type_main-medium`}>Булки</h2>
            {props.data.filter(thing => thing.type === "bun").map(bun =>
                (<IngredientCard ing={bun} key={bun._id}/>)
            )}
            <h2 className={`${styles.type} mb-6 text text_type_main-medium`}>Соусы</h2>
            {props.data.filter(thing => thing.type === "sauce").map(sauce =>
                (<IngredientCard ing={sauce} key={sauce._id}/>))
            }
            <h2 className={`${styles.type} mb-6 text text_type_main-medium`}>Котлетка</h2>
            {props.data.filter(thing => thing.type === "main").map(main =>
                (<IngredientCard ing={main} key={main._id}/>))
            }
        </div>
    </div>)
}

BurgerIngridients.propTypes = {
    data: PropTypes.arrayOf(ingType)
}

export default BurgerIngridients;