import React from 'react';
import styles from './App.module.css';
import {Route, Switch, useLocation} from "react-router-dom";
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

function App() {
    const location = useLocation();

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
                    {location?.state?.from === '/' && <MainPage/>}
                    {location?.state?.from !== '/' && <IngredientPage/>}
                </Route>
                <ProtectedRoute path="/profile/orders/:id">
                    {location?.state?.from === '/' && <OrderHistoryPage/>}
                    {location?.state?.from !== '/' && <OrderDetailsPage selector={'userOrders'}/>}
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders">
                    <OrderHistoryPage/>
                </ProtectedRoute>
                <Route path="/feed/:id">
                    {location?.state?.from === '/' && <FeedPage/>}
                    {location?.state?.from !== '/' && <OrderDetailsPage selector={'feed'}/>}
                </Route>
                <Route path="/feed">
                    <FeedPage/>
                </Route>
            </Switch>

        </div>
    );
}

export default App;
