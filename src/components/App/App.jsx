import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import Modal from "../Modal/Modal";
import {getIngredientsAction} from "../../services/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {

    const dispatch = useDispatch();

    const {isLoaded, hasError} = useSelector(store => (store.ingredients))

    const [modal, setModal] = useState({
        showModal: false,
        modal: null,
        title: null
    });


    useEffect(() => {
        dispatch(getIngredientsAction())
        }, [dispatch])


    function onClose() {
        setModal({
            showModal: false,
            modal: null,
            title: null
        })
    }

    function openModal(content, title) {
        setModal({
            showModal: true,
            modal: content,
            title: title
        })
    }


    return (
        <div className={styles.App}>
            <AppHeader/>
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

        </div>
    );
}

export default App;
