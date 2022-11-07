import React from 'react';
import styles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import {data} from "../../utils/data";

function App() {

    return (
        <div className={styles.App}>
            <AppHeader/>
            <BurgerIngridients data={data}/>
            <BurgerConstructor bun={data.find(el => el.type === "bun")}
                               mains={data.filter(el => el.type !== "bun")}/>
        </div>
    );
}

export default App;
