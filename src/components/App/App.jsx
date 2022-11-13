import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import {url} from "../../utils/data";
import Modal from "../Modal/Modal";
import {DataContext} from './dataContext'
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
                        ...state,
                        hasError: true,
                        isLoaded: false
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
                {state.isLoaded && <BurgerIngridients data={state.data}
                                                      openModal={openModal}
                />}
                {state.isLoaded && <BurgerConstructor //bun={state.data.find(el => el.type === "bun")}
                                                      //mains={state.data.filter(el => el.type !== "bun")}
                                                      openModal={openModal}
                />
                }
                {modal.showModal &&
                <Modal content={modal.modal} onClose={onClose} isVisible={modal.showModal} title={modal.title}/>}
            </DataContext.Provider>
        </div>
    );
}

export default App;
