import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styles from './styles.module.css'
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser} from "../services/actions";

const ProfilePage = () => {
    const user = useSelector(store => store.user);
    const location = useLocation()

    const [name, setName] = useState(user && user.name ? user.name : '');
    const [email, setEmail] = useState(user && user.name ? user.name : '');
    const [password, setPassword] = useState(user && user.name ? user.name : '');

    const onChange = f => e => {
        f(e.target.value)
    };
    const dispatch = useDispatch();
    const onSubmit = (e)=> {
        e.preventDefault();
        dispatch(setUser({name,  email, password}))
    }

    return (
        <div className={styles.profileContainer}>
            <nav>
                <ul section className={styles.menu}>
                    <li className={`${styles.menuItem} `}>
                        <Link to={"/profile"}
                              className={`${styles.link} text text_type_main-medium`+(location.pathname!=='/profile'?" text_color_inactive":" text_color_primary")}>
                            <p className={""}> Профиль </p>
                        </Link>
                    </li>
                    <li className={`${styles.menuItem}`}>
                        <Link to={"/profile/orders"}
                              className={`${styles.link} text text_type_main-medium`+(location.pathname!=='/profile/orders'?" text_color_inactive":" text_color_primary")}>История заказов</Link>
                    </li>
                    <li className={`${styles.menuItem}`}>
                        <Link to={"/profile/logout"}
                              className={`${styles.link} text text_type_main-medium`+(location.pathname!=='/profile/logout'?" text_color_inactive":" text_color_primary")}>Выход</Link>
                    </li>
                </ul>
                <p className='mt-10 text text_color_inactive'>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </nav>
            <section className={styles.main}>
                <form onSubmit={onSubmit}>
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
                </form>
            </section>
        </div>
    )
};

export default ProfilePage
