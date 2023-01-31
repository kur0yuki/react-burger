import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngridients from "../components/BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import Modal from "../components/Modal/Modal";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsAction} from "../services/actions/actions";
import styles from './styles.module.css'
import {useHistory} from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const {isLoaded, hasError} = useSelector(store => (store.ingredients));

    const [modal, setModal] = useState({
        showModal: false,
        modal: null,
        title: null
    });


    useEffect(() => {
        dispatch(getIngredientsAction())
    }, [dispatch]);


    function onClose() {
        setModal({
            showModal: false,
            modal: null,
            title: null
        })
        history.goBack()
    }

    function openModal(content, title, id) {
        history.push({pathname: '/ingredients/'+id, state:{from: "/"}})
        setModal({
            showModal: true,
            modal: content,
            title: title
        })
    }

    return (<div className={styles.twoCols}>
        {hasError && <p>Something went wrong. Please reload</p>}

                    <DndProvider backend={HTML5Backend}>
                        {isLoaded && <BurgerIngridients openModal={openModal}/>}
                        {isLoaded && <BurgerConstructor openModal={openModal}/>}
                    </DndProvider>
                    {modal.showModal && <Modal content={modal.modal}
                                               onClose={onClose}
                                               isVisible={modal.showModal}
                                               title={modal.title}/>
                    }
    </div>)
}

export default MainPage
