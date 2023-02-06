import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import styles from './styles.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUser, setUser, signOut} from "../services/actions";
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";

const ProfilePage = () => {
    const user = useSelector(store => store.user);

    const [name, setName] = useState(user?.name|| '');
    const [email, setEmail] = useState(user?.email ||'');
    const [password, setPassword] = useState('');
    const [changed, setChanged] = useState(false);

    const onChange = f => e => {
        f(e.target.value);
        if(e.target.name==='' || e.target.name!==user[name]) setChanged(true)
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

    useEffect(()=>{
        if(!user?.name){
            dispatch(getUser())
        }
    },[])
    useEffect(()=>{
        if(name==='' && user?.name){
            setName(user.name)
            setEmail(user.email)
            setChanged(false)
        }
    },[user])

    return (
        <div className={styles.profileContainer}>
            <ProfileSidebar/>
            <section>
                <form onSubmit={onSubmit} onReset={onReset}>
                    <Input type={'text'}
                           placeholder={'Name'}
                           value={name}
                           name={'name'}
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
