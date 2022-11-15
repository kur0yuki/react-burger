import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngridients.module.css'
import IngredientCard from "../IngredientCard/IngredientCard";
import PropTypes from "prop-types";
import {DataContext} from "../../contexts/dataContext";

function BurgerIngridients(props) {
    const data = useContext(DataContext);
    const tabBunRef = useRef();
    const tabSauceRef = useRef();
    const tabMainRef = useRef();

    const [tabs, setTab] = useState("bun");

    const options = useMemo(() => {
        return {
            root: document.querySelector(`.${styles.ingridientsWindow}`),
            threshold: [0, 0.5, 1]
        }
    }, []);

    let observer = new IntersectionObserver(callback, options);

    useEffect(() => {
        observer.observe(tabBunRef.current);
        observer.observe(tabSauceRef.current);
        observer.observe(tabMainRef.current)
    }, []);

    function callback(entries, observer) {
        //console.log(entries)
        const entry = entries.find(entry => entry.isIntersecting);
        //console.log(entry)
        if (entry && entry.target) {
            switch (entry.target) {
                case tabBunRef.current:
                    setTab("bun");
                    break;
                case tabMainRef.current:
                    setTab("main");
                    break;
                case tabSauceRef.current:
                    setTab("sauce");
                    break;
                default:
                    //setTab("bun");
                    break;
            }
        }
    }


    function onClick(ref) {
        return () => {
            ref.current.scrollIntoView({behavior: "smooth"})
        }
    }

    return (<div className={`${styles.BurgerIngridients} pt-10`}>
        <h2 className='text text_type_main-large'>Соберите бургер</h2>
        <div className={`${styles.tabs} mb-10 mt-5`}>
            <Tab active={tabs === "bun"}
                 value={0}
                 onClick={onClick(tabBunRef)}><p className='text text_type_main-default'>Булки</p></Tab>
            <Tab active={tabs === "sauce"}
                 value={0}
                 onClick={onClick(tabSauceRef)}><p className='text text_type_main-default'>Соусы</p></Tab>
            <Tab active={tabs === "main"}
                 value={0}
                 onClick={onClick(tabMainRef)}><p className='text text_type_main-default'>Котлетки</p></Tab>
        </div>
        <div className={styles.ingridientsWindow}>
            <div ref={tabBunRef} className={styles.typeSection}>
            <h2  className={`${styles.type} mb-6 text text_type_main-medium`}>Булки</h2>
            {data.filter(thing => thing.type === "bun").map(bun =>
                (<IngredientCard ing={bun} key={bun._id}
                                 openModal={props.openModal}
                />)
            )}
            </div>
            <div ref={tabSauceRef} className={styles.typeSection}>
            <h2  className={`${styles.type} mb-6 text text_type_main-medium`}>Соусы</h2>
            {data.filter(thing => thing.type === "sauce").map(sauce =>
                (<IngredientCard ing={sauce} key={sauce._id}
                                 openModal={props.openModal}
                />))
            }
            </div>
            <div ref={tabMainRef} className={styles.typeSection}>
            <h2 ref={tabMainRef} className={`${styles.type} mb-6 text text_type_main-medium`}>Котлетка</h2>
            {data.filter(thing => thing.type === "main").map(main =>
                (<IngredientCard ing={main} key={main._id}
                                 openModal={props.openModal}
                />))
            }
            </div>
        </div>
    </div>)
}

BurgerIngridients.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default BurgerIngridients;
