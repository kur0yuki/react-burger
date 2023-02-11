import React, {FC, ReactNode} from 'react';
import styles from './IngredientCard.module.css'
import appStyles from '../App/App.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingrefient";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {SET_CURRENT_INGREDIENT} from "../../services/constants";
import {TIngredientData} from "../../utils/types";

const IngredientCard: FC<{ ing: TIngredientData, openModal: (content: ReactNode, title: string, id: string)=>void }> = (props) => {
    const dispatch = useDispatch()
    const [{opacity},dragRef] = useDrag({
        type: props.ing.type,
        item: props.ing,
        collect: monitor => ({opacity: monitor.isDragging()?0.5:1})
    })

    return (
        <article className={`${styles.article} mb-8 mr-4 ml-4`} draggable
                 style={{opacity}}
                 onClick={() => {
                     dispatch({type: SET_CURRENT_INGREDIENT, payload: props.ing})
                     props.openModal(
                         <Ingredient />,
                         'Детали ингредиента',
                         props.ing._id)
                 }}
                 ref = {dragRef}
        >
            <img src={props.ing.image} alt={props.ing.name}/>
            <div className={appStyles.price}>
                <p className='text text_type_digits-default'>{props.ing.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default name">{props.ing.name}</p>
            {props.ing.q>0 && <Counter count={props.ing.q} size="default"/>}
        </article>
    )

}

IngredientCard.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default IngredientCard;
