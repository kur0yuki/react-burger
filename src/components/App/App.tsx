import React, {FC, useEffect, useState} from 'react';
import styles from './App.module.css';
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";
import RegistrationPage from "../../pages/Registration";
import ForgotPasswordPage from "../../pages/ForgotPassword";
import ResetPasswordPage from "../../pages/ResetPassword";
import ProfilePage from "../../pages/ProfilePage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AppHeader from "../AppHeader/AppHeader";
import IngredientPage from "../../pages/IngredientPage";
import FeedPage from "../../pages/FeedPage";
import OrderHistoryPage from "../../pages/OrderHistoryPage";
import OrderDetailsPage from "../../pages/OrderDetailsPage";
import {getIngredientsAction} from "../../services/actions/actions";
import {useDispatch} from '../../services/hooks'
import Modal from "../Modal/Modal";
import {TModal} from "../../utils/types";

const App: FC = () => {
    const location = useLocation<{ background?: boolean; from: string }>();
    const history = useHistory<unknown>();

    const dispatch = useDispatch();
    const background = location?.state?.background;

    const [modal, setModal] = useState<TModal>({
        showModal: false,
    });

    function onClose() {
        setModal({
            showModal: false,
        });
        history.goBack()
    }

    useEffect(() => {
        dispatch(getIngredientsAction())
    }, [dispatch]);

    useEffect(() => {
        console.log(`on ${location.pathname}\nfrom ${location?.state?.from}`)
    }, [location]);

    return (
        <div className={styles.App}>
            <AppHeader/>
            <Switch>
                <ProtectedRoute onlyForAuth={false} path="/login">
                    <LoginPage/>
                </ProtectedRoute>
                <ProtectedRoute onlyForAuth={false} path="/register">
                    <RegistrationPage/>
                </ProtectedRoute>
                <ProtectedRoute onlyForAuth={false} path="/forgot-password">
                    <ForgotPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute onlyForAuth={false} path="/reset-password">
                    <ResetPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <MainPage setModal={setModal}/>
                </Route>
                <Route path="/ingredients/:id">
                    {location?.state?.from === '/' && <MainPage setModal={setModal}/>}
                    {location?.state?.from !== '/' && <IngredientPage/>}
                </Route>
                <ProtectedRoute path="/profile/orders/:id">
                    {location?.state?.from === '/profile/orders' && <OrderHistoryPage/>}
                    {location?.state?.from !== '/profile/orders' && <OrderDetailsPage selector={'userOrders'}/>}
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders">
                    <OrderHistoryPage/>
                </ProtectedRoute>
                <Route path="/feed/:id">
                    {location?.state?.from === '/feed' && <FeedPage/>}
                    {location?.state?.from !== '/feed' && <OrderDetailsPage selector={'feed'}/>}
                </Route>
                <Route path="/feed">
                    <FeedPage/>
                </Route>
            </Switch>

            {background && modal.showModal &&
            <Route path={'/ingredients/:id'}><Modal content={modal.modal}
                                                    onClose={onClose}
                                                    isVisible={modal.showModal}
                                                    title={modal.title || ''}/>
            </Route>}
            {background && modal.showModal &&
            <Route path={'/'}><Modal content={modal.modal}
                                     onClose={onClose}
                                     isVisible={modal.showModal}
                                     title={modal.title || ''}/>
            </Route>}

        </div>
    );
}

export default App;
