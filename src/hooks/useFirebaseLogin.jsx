import { useContext, useState } from 'react';
import { Firebase_Login, auth } from '../utils/firebase';
import Context from '../context';

export const useFirebaseLogin = () => {
    const obj = useContext(Context);

    const login = async (email, password) => {
        await Firebase_Login(email, password);
        return auth;
    };

    return login;
};