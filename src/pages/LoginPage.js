import styles from './styles.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {signIn} from "../services/actions";
import {getCookie} from "../utils/api";

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
    const history = useHistory();
    const user=useSelector(store=> store.user)
    const hasToken = getCookie('accessToken')


    useEffect(()=>{
        if (hasToken || user?.name) {
            const redirectTo=sessionStorage.getItem('location')
            sessionStorage.removeItem('location')
                history.replace(redirectTo?redirectTo:'/')
            }
    },[hasToken, user])



    return (<div className={styles.centered}>
        <h1 className='text_color_primary text text_type_main-medium mb-6'>Вход</h1>
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
                onClick={onClick} extraClass={`mb-20 ${styles.button}`}
        >
            Войти
        </Button>
        </form>
        <p className='text text_type_main-default text_color_inactive mb-4'>
            Вы — новый пользователь?
            <Link to='/sign-up'> Зарегистрироваться</Link></p>
        <p className='text text_type_main-default text_color_inactive'>
            Забыли пароль?
            <Link to='/reset-password'> Восстановить пароль</Link></p>
    </div>)
}

export default LoginPage
