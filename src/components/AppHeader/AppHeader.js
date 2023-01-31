import React from 'react';
import {BurgerIcon, ListIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import appStyles from '../App/App.module.css'
import {Link, useLocation} from "react-router-dom";

function AppHeader() {
    const location = useLocation()

    return (
        <header className={`${styles.AppHeader} m-5 p-2`}>
            <div className={appStyles.row}>
                <Link className={`mr-2 p-2 ${styles.link} ${appStyles.row} `} to='/'>
                    <BurgerIcon type="primary"/>
                    <p className={"text text_type_main-default ml-1"+(location.pathname!=='/'?" text_color_inactive":"")}>Конструктор</p>
                </Link>
                <Link className={`mr-2 p-2 ${styles.link} ${appStyles.row}`} to='/feed'>
                    <ListIcon type="secondary"/>
                    <p className={'text text_type_main-default ml-1'+(location.pathname!=='/feed'?" text_color_inactive":"")}>Лента заказов</p>
                </Link>
            </div>
            <div className={styles.logo}>
                <Link to={'/'}><Logo/></Link>
            </div>

            <Link className={`mr-2 p-2 ${styles.link} ${appStyles.row}`} to={'/profile'}>
                <BurgerIcon type="secondary"/>
                <p className={'text text_type_main-default ml-1'+(location.pathname!=='/profile'?" text_color_inactive":"")}>Личный кабинет</p>
            </Link>
        </header>
    )
}


export default AppHeader;
