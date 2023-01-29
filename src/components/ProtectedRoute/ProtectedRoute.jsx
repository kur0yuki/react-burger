import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {getUser} from "../../services/actions/auth-actions";
import {getCookie} from "../../utils/api";

const ProtectedRoute = ({children, ...rest}) => {
    const user = useSelector(store => store.user);
    const tokenRefresh = useSelector(store => store.tokenRefresh);
    const hasToken = getCookie('accessToken');

    const dispatch = useDispatch();
    const location = useLocation();

    function init() {
        dispatch(getUser())
    }

    useEffect(() => {
        init();
    }, []);

    if (tokenRefresh) {
        init()
    }

    if (!tokenRefresh && !user?.name && !hasToken) {
        sessionStorage.setItem('location', location.pathname);
        return <Redirect to={{pathname: "/login", state: {from: location.pathname}}}/>
    }
    return (<Route {...rest} >
        {children}
    </Route>)
};

export default ProtectedRoute
