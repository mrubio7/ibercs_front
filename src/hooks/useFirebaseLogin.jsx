import { useContext, useState } from 'react';
import { Firebase_Login } from '../utils/firebase';
import Context from '../context';

export const useFirebaseLogin = () => {
    const obj = useContext(Context);

    const login = async (email, password) => {
        console.log(`Logging in with email: ${email} and password: ${password}`);
        try {
            const auth = await Firebase_Login(email, password);
            console.log('Authentication result:', auth);
            return auth;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return login;
};