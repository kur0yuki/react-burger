import {Redirect, Route, useLocation} from "react-router-dom";
import React, {FC, ReactNode} from "react";
import {getCookie} from "../../utils/api";
import {useSelector} from "../../services/hooks";

type TProps = {
    children: ReactNode
    onlyForAuth: boolean
    //path: string
} & any
const ProtectedRoute: FC<TProps> = ({children, onlyForAuth = true, ...rest}) => {
    const hasToken = getCookie('accessToken');

    const location = useLocation<{ from?: string }>();
    const user=useSelector(store=> store.user)


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
