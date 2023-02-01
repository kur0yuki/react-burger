import styles from './styles.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {signIn} from "../services/actions";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChange = e => {
        setEmail(e.target.value)
    }
    const dispatch = useDispatch()

    const onClick = (e)=>{
        e.preventDefault()
        dispatch(signIn({email, password}))
    }

    return (<div className={`${styles.formWrapper} ${styles.centered} mt-30`}>
        <h1 className='text_color_primary text text_type_main-medium mb-6 pt-15'>Вход</h1>
        <form onSubmit={onClick}>
        <EmailInput value={email}
                    onChange={onChange}
                    name={'email'}
                    extraClass='mb-6'
        />
        <PasswordInput value={password}
                       onChange={e=>setPassword(e.target.value)}
                       extraClass='mb-6'
        />
        <Button htmlType="submit" type="primary" size="medium"
                extraClass={`mb-20 ${styles.button}`}
        >
            Войти
        </Button>
        </form>
        <p className='text text_type_main-default text_color_inactive mb-4'>
            Вы — новый пользователь?
            <Link to='/register'> Зарегистрироваться</Link></p>
        <p className='text text_type_main-default text_color_inactive'>
            Забыли пароль?
            <Link to='/reset-password'> Восстановить пароль</Link></p>
    </div>)
}

export default LoginPage
