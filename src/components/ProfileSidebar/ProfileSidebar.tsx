import styles from "./ProfileSidebar.module.css";
import {Link, useHistory, useLocation} from "react-router-dom";
import {signOut} from "../../services/actions";
import {useDispatch} from "../../services/hooks";
import {FC} from "react";

const ProfileSidebar: FC = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(signOut());
        history.push('/login')
    };
    return (<nav>
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
            </nav>)
}
export default ProfileSidebar;
