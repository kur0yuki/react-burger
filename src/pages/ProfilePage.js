import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import styles from './styles.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser, signOut} from "../services/actions";

const ProfilePage = () => {
    const user = useSelector(store => store.user);
    const location = useLocation();
    const history = useHistory();

    const [name, setName] = useState(user && user.name ? user.name : '');
    const [email, setEmail] = useState(user && user.email ? user.email : '');
    const [password, setPassword] = useState('');
    const [changed, setChanged] = useState(false);

    const onChange = f => e => {
        f(e.target.value);
        setChanged(true)
    };
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setUser({name, email, password}));
        setChanged(false)
    };
    const onReset = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword('');
        setChanged(false)
    };

    const onLogout = () => {
        dispatch(signOut());
        history.push('/login')
    };

    return (
        <div className={styles.profileContainer}>
            <nav>
                <ul className={styles.menu}>
                    <li className={`${styles.menuItem} `}>
                        <Link to={"/profile"}
                              className={`${styles.link} text text_type_main-medium` + (location.pathname !== '/profile' ? " text_color_inactive" : " text_color_primary")}>
                            <p className={""}> Профиль </p>
                        </Link>
                    </li>
                    <li className={`${styles.menuItem}`}>
                        <Link to={"/profile/orders"}
                              className={`${styles.link} text text_type_main-medium` + (location.pathname !== '/profile/orders' ? " text_color_inactive" : " text_color_primary")}>История
                            заказов</Link>
                    </li>
                    <li className={`${styles.menuItem}`} onClick={onLogout}>
                        <Link to={"/profile/logout"}
                              className={`${styles.link} text text_type_main-medium` + (location.pathname !== '/profile/logout' ? " text_color_inactive" : " text_color_primary")}>Выход</Link>
                    </li>
                </ul>
                <p className='mt-10 text text_color_inactive'>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </nav>
            <section className={styles.main}>
                <form onSubmit={onSubmit} onReset={onReset}>
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
                                   placeholder={'******'}
                    />

                    {changed && <div>
                        <Button htmlType={'submit'} type="primary" size="medium"
                                extraClass={`mb-20 mr-10`}>Изменить</Button>
                        <Button htmlType={'reset'} type="primary" size="medium"
                                extraClass={`mb-20`} onClick={onReset}>Отменить</Button>
                    </div>
                    }
                </form>
            </section>
        </div>
    )
};

export default ProfilePage
