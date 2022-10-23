import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import './BurgerIngridients.css'
import IngredientCard from "../IngredientCard/IngredientCard";

class BurgerIngridients extends React.Component {
    render() {
        return <div className='BurgerIngridients pt-10'>
            <h2 className='section-title text text_type_main-large'>Соберите бургер</h2>
            <div className="tabs mb-10 mt-5">
                <Tab active={true} value={0} onClick={0}><p className='text text_type_main-default'>Булки</p></Tab>
                <Tab active={false} value={0} onClick={0}><p className='text text_type_main-default'>Соусы</p></Tab>
                <Tab active={false} value={0} onClick={0}><p className='text text_type_main-default'>Котлетки</p></Tab>
            </div>
            <div className='ingridientsWindow'>
                <h2 className="type mb-6 text text_type_main-medium">Булки</h2>
                {this.props.data.filter(thing => thing.type==="bun").map(bun=>
                    <IngredientCard {...bun} />
                )}
                <h2 className="type mb-6 text text_type_main-medium">Соусы</h2>
                {this.props.data.filter(thing => thing.type==="sauce").map(bun=>
                    <IngredientCard {...bun} />)
                }
                <h2 className="type mb-6 text text_type_main-medium">Котлетка</h2>
                {this.props.data.filter(thing => thing.type==="main").map(bun=>
                    <IngredientCard {...bun} />)
                }
            </div>
        </div>
    }
}
export default BurgerIngridients;