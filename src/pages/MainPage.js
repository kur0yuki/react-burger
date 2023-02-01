import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngridients from "../components/BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './styles.module.css'
import {useHistory} from "react-router-dom";
import {useParams} from "react-router";
import Ingredient from "../components/Ingredient/Ingrefient";
import {SET_CURRENT_INGREDIENT} from "../services/actions/actions";

const MainPage = ({setModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const id = useParams()?.id;
    const {data,isLoaded, hasError} = useSelector(store => (store.ingredients));

    useEffect(() => {
        if (id && isLoaded) {
            dispatch({type: SET_CURRENT_INGREDIENT, payload: data.find(ing => ing._id===id)});
            setModal({
                showModal: true,
                modal: <Ingredient/>,
                title: 'Детали ингредиента'
            })
        }
    }, [data, id]);

    function openModal(content, title, id) {
        history.push({pathname: '/ingredients/' + id, state: {from: "/", background: true}});
    }

    return (<div className={styles.twoCols}>
        {hasError && <p>Something went wrong. Please reload</p>}

        <DndProvider backend={HTML5Backend}>
            {isLoaded && <BurgerIngridients openModal={openModal}/>}
            {isLoaded && <BurgerConstructor openModal={(content) => {
                history.replace({pathname: '/', state: {from: "/", background: true}});
                setModal({modal: content, showModal: true})
            }}/>}
        </DndProvider>
    </div>)
};

export default MainPage
