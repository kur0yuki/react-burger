import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import Modal from "../Modal/Modal";
import {DataContext} from '../../contexts/dataContext'
import {getIngredients} from "../../utils/api";

function App() {
    const [state, setState] = useState({
        isLoaded: false,
        hasError: false,
        data: []
    });
    const [modal, setModal] = useState({
        showModal: false,
        modal: null,
        title: null
    });

    useEffect(() => {
            setState({
                isLoaded: false,
                hasError: false,
                data: []
            })
            getIngredients()
                .then(res => {
                    setState({
                        isLoaded: true,
                        hasError: false,
                        data: res.data
                    })
                })
                .catch(er => {
                    setState({
                        hasError: true,
                        isLoaded: false,
                        data: []
                    });
                    console.error(er)
                })
    }, []);

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

    const data=state.data

    return (
        <div className={styles.App}>
            <AppHeader/>
            {state.hasError && <p>Something went wrong. Please reload</p>}
            <DataContext.Provider value={data} >
                {state.isLoaded && <BurgerIngridients openModal={openModal} />}
                {state.isLoaded && <BurgerConstructor openModal={openModal} />}
                {modal.showModal &&
                <Modal content={modal.modal}
                       onClose={onClose}
                       isVisible={modal.showModal}
                       title={modal.title} />
                }
            </DataContext.Provider>
        </div>
    );
}

export default App;
