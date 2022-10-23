import React from 'react';
import './IngredientCard.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


class IngredientCard extends React.Component {
    render() {
        return (
            <article className="article mb-8 mr-4 ml-4" key={this.props.id}>
                <img src={this.props.image} alt="булочка" className=""/>
                <div className="price">
                    <p className='text text_type_digits-default'>{this.props.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className="text text_type_main-default name">{this.props.name}</p>
                <Counter count={1} size="default"/>
            </article>
        )
    }

}

export default IngredientCard;
