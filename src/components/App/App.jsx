import React, {useEffect, useState} from 'react';
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
import {useDispatch} from "react-redux";
import Modal from "../Modal/Modal";

function App() {
    const location = useLocation();
    const history = useHistory()

    const dispatch = useDispatch();
    const background = location?.state?.background;

    const [modal, setModal] = useState({
        showModal: false,
    });
        function onClose() {
        setModal({
            showModal: false,
        })
        history.goBack()
    }

    useEffect(() => {
        dispatch(getIngredientsAction())
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <AppHeader/>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/register">
                    <RegistrationPage/>
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage/>
                </Route>
                <Route path="/reset-password">
                    <ResetPasswordPage/>
                </Route>
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <MainPage/>
                </Route>
                <Route path="/ingredients/:id">
                    {location?.state?.from === '/' && <MainPage setModal={setModal}/>}
                    {location?.state?.from !== '/' && <IngredientPage/>}
                </Route>
                <ProtectedRoute path="/profile/orders/:id">
                    {location?.state?.from === '/profile/orders' && <OrderHistoryPage/>}
                    {location?.state?.from !== '/profile/orders' && <OrderDetailsPage selector={'user'}/>}
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

            {background && modal.showModal && <Route path={'/ingredients/:id'}><Modal content={modal.modal}
                                  onClose={onClose}
                                  isVisible={modal.showModal}
                                  title={modal.title}/>
            </Route>}


        </div>
    );
}

export default App;
