import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngridients.module.css'
import IngredientCard from "../IngredientCard/IngredientCard";

class BurgerIngridients extends React.Component {
    render() {
        return <div className={`${styles.BurgerIngridients} pt-10`}>
            <h2 className='text text_type_main-large'>Соберите бургер</h2>
            <div className={`${styles.tabs} mb-10 mt-5`}>
                <Tab active={true} value={0} onClick={0}><p className='text text_type_main-default'>Булки</p></Tab>
                <Tab active={false} value={0} onClick={0}><p className='text text_type_main-default'>Соусы</p></Tab>
                <Tab active={false} value={0} onClick={0}><p className='text text_type_main-default'>Котлетки</p></Tab>
            </div>
            <div className={styles.ingridientsWindow}>
                <h2 className={`${styles.type} mb-6 text text_type_main-medium`}>Булки</h2>
                {this.props.data.filter(thing => thing.type==="bun").map(bun=>
                    <IngredientCard {...bun} />
                )}
                <h2 className={`${styles.type} mb-6 text text_type_main-medium`}>Соусы</h2>
                {this.props.data.filter(thing => thing.type==="sauce").map(bun=>
                    <IngredientCard {...bun} />)
                }
                <h2 className={`${styles.type} mb-6 text text_type_main-medium`}>Котлетка</h2>
                {this.props.data.filter(thing => thing.type==="main").map(bun=>
                    <IngredientCard {...bun} />)
                }
            </div>
        </div>
    }
}
export default BurgerIngridients;