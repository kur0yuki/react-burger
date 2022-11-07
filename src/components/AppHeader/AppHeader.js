import React from 'react';
import {BurgerIcon, ListIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import appStyles from '../App/App.module.css'

function AppHeader() {
    return (<div className={`${styles.AppHeader} m-5 p-2`}>
        <div className={appStyles.row}>
            <a className={`mr-2 p-2 ${styles.link} ${appStyles.row}`} href='#'>
                <BurgerIcon type="primary"/>
                <p className='text text_type_main-default ml-1'>Конструктор</p>
            </a>
            <a className={`mr-2 p-2 ${styles.link} ${appStyles.row}`} href='#'>
                <ListIcon type="secondary"/>
                <p className='text text_type_main-default text_color_inactive ml-1'>Лента заказов</p>
            </a>
        </div>
        <div className={styles.logo}>
            <Logo/>
        </div>

        <a className={`mr-2 p-2 ${styles.link} ${appStyles.row}`} href='#'>
            <BurgerIcon type="secondary"/>
            <p className='text text_type_main-default text_color_inactive ml-1'>Личный кабинет</p>
        </a>
    </div>)
}


export default AppHeader;