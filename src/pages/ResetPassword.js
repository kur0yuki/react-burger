import styles from './styles.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {resetPasswordSave} from "../services/actions";
import {getCookie} from "../utils/api";


const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const onChange = f => e => {
        f(e.target.value)
    };
    const dispatch = useDispatch();
    const history = useHistory()
    const location = useLocation()


    const onClick = () => {
        dispatch(resetPasswordSave({password, token}));
        history.replace({pathname: "/login"})
    };

    if (location?.state?.from!=='forgot'){
        return (<Redirect  to={'/forgot-password'}/>)
    }

    return (
        <div className={`${styles.formWrapper} ${styles.centered} mt-30`}>
            <h1 className='text_color_primary text text_type_main-medium mb-6 pt-15'>Восстановление пароля</h1>
            <form onSubmit={onClick}>
                <PasswordInput value={password}
                               onChange={onChange(setPassword)}
                               extraClass='mb-6'
                />
                <Input type={'text'}
                       placeholder={'Введите код из письма'}
                       value={token}
                       onChange={onChange(setToken)}
                       extraClass='mb-6'
                />
                <Button htmlType="submit" type="primary" size="medium"
                        extraClass={`mb-20 ${styles.button}`}
                >
                    Сохранить
                </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4'>
                Уже Вспомнили пароль??
                <Link to='/login'> Войти</Link></p>

        </div>)
};

export default ResetPasswordPage

