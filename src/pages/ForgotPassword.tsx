import styles from './styles.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {useDispatch} from "../services/hooks";
import {Link, useHistory} from "react-router-dom";
import {resetPassword} from "../services/actions";


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const onChange = (f: Dispatch<SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
        f(e.target.value)
    };
    const dispatch = useDispatch();
    const history = useHistory();

    const onClick = () => {
        dispatch(resetPassword({email}));
        history.push({pathname: "/reset-password", state: {from: "forgot"}})
    };

    return (
        <div className={`${styles.formWrapper} ${styles.centered} mt-30`}>
            <h1 className='text_color_primary text text_type_main-medium mb-6 pt-15'>Восстановление пароля</h1>
            <form onSubmit={onClick}>
                <EmailInput value={email}
                            onChange={onChange(setEmail)}
                            name={'email'}
                            extraClass='mb-6'
                />
                <Button htmlType="submit" type="primary" size="medium"
                        extraClass={`mb-20 ${styles.button}`}
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
