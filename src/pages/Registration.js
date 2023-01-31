import styles from './styles.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link,useHistory} from "react-router-dom";
import {register} from "../services/actions/auth-actions";
import {getCookie} from "../utils/api";


const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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


    const onChange = f => e => {
        f(e.target.value)
    };
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault()
        dispatch(register({email, password, name}))
        history.push('/login')
    };

    return (
        <div className={`${styles.formWrapper} ${styles.centered} mt-30`}>
            <h1 className='text_color_primary text text_type_main-medium mb-6 mt-15'>Регистрация</h1>
            <form onSubmit={onClick}>
            <Input type={'text'}
                   placeholder={'Name'}
                   value={name}
                   onChange={onChange(setName)}
                    extraClass='mb-6'
            />
            <EmailInput value={email}
                        onChange={onChange(setEmail)}
                        name={'email'}
                        extraClass='mb-6'
            />
            <PasswordInput value={password}
                           onChange={onChange(setPassword)}
                           extraClass='mb-6'
            />
            <Button htmlType="submit" type="primary" size="medium"
                    onClick={onClick} extraClass={`mb-20 ${styles.button}`}
            >
                Зарегистрироваться
            </Button>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4'>
                Уже зарегистрированы?
                <Link to='/login'> Войти</Link></p>

        </div>)
};

export default RegistrationPage
