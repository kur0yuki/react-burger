import React from 'react';
import styles from './IngredientCard.module.css'
import appStyles from '../App/App.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingType} from "../../utils/data";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingrefient";

function IngredientCard(props) {
    return (
        <article className={`${styles.article} mb-8 mr-4 ml-4`}
                 onClick={() => {
                     props.openModal(
                         <Ingredient ing={props.ing}/>,
                         'Детали ингредиента')
                 }}>
            <img src={props.ing.image} alt={props.ing.name}/>
            <div className={appStyles.price}>
                <p className='text text_type_digits-default'>{props.ing.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default name">{props.ing.name}</p>
            <Counter count={1} size="default"/>
        </article>
    )

}

IngredientCard.propTypes = {
    ing: ingType.isRequired,
    openModal: PropTypes.func.isRequired
};

export default IngredientCard;
