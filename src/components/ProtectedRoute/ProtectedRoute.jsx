import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {getUser} from "../../services/actions/auth-actions";
import {getCookie} from "../../utils/api";

const ProtectedRoute = ({children, onlyForAuth=true, ...rest}) => {
    //const user = useSelector(store => store.user);
    //const tokenRefresh = useSelector(store => store.tokenRefresh);
    const hasToken = getCookie('accessToken');

    //const dispatch = useDispatch();
    const location = useLocation();
    const user=useSelector(store=> store.user)

    //
    // useEffect(() => {
    //     dispatch(getUser())
    // }, []);

    // if (tokenRefresh) {
    //     init()
    // }

    if (!hasToken && onlyForAuth) {
        //sessionStorage.setItem('location', location.pathname);
        return <Redirect to={{pathname: "/login", state: {from: location.pathname}}}/>
    }
    if (hasToken && !onlyForAuth) {
        const link = location?.state?.from || '/';
        return <Redirect to={link}/>
    }

    return (<Route {...rest} >
        {children}
    </Route>)
};

export default ProtectedRoute
