import styles from './styles.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {resetPassword} from "../services/actions";
import {getCookie} from "../utils/api";


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const onChange = f => e => {
        f(e.target.value)
    };
    const dispatch = useDispatch();
    const history = useHistory()
    const user=useSelector(store=> store.user)
    const hasToken = getCookie('accessToken')

    useEffect(()=>{
        if (hasToken || user?.name) {
            const redirectTo=sessionStorage.getItem('location')
            sessionStorage.removeItem('location')
                history.replace(redirectTo?redirectTo:'/')
            }
            //return (<Redirect to={"/"} />)
            //console.log({email, password})
    },[hasToken, user])

    const onClick = () => {
        dispatch(resetPassword({email}))
        history.push({pathname: "/reset-password", state: {from: "forgot"}})
    };

    return (
        <div className={styles.centered}>
            <h1 className='text_color_primary text text_type_main-medium mb-6'>Восстановление пароля</h1>
            <form onSubmit={onClick}>
            <EmailInput value={email}
                        onChange={onChange(setEmail)}
                        name={'email'}
                        extraClass='mb-6'
            />
            <Button htmlType="submit" type="primary" size="medium"
                    onClick={onClick} extraClass={`mb-20 ${styles.button}`}
            >
                Восстановить
            </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4'>
                Вспомнили пароль?
                <Link to='/login'> Войти</Link></p>

        </div>)
};

export default ForgotPasswordPage