import { useState } from 'react';
import { Firebase_Logout, auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

export const useFirebaseLogout = () => {
    const logout = async () => {
        await Firebase_Logout();
        return auth;
    };

    return logout;
};